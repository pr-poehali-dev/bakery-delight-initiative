import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface Material {
  id: number;
  name: string;
  description: string;
  quantity: number;
  minStock: number;
  price: number;
}

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([
    { id: 2, name: "Мука пшеничная", description: "Высший сорт", quantity: 45, minStock: 50, price: 560 },
    { id: 6, name: "Дрожжи", description: "Свежие прессованные", quantity: 8, minStock: 10, price: 900 },
    { id: 3, name: "Сахар", description: "Песок", quantity: 25, minStock: 20, price: 700 },
    { id: 5, name: "Масло сливочное", description: "82.5%", quantity: 15, minStock: 12, price: 450 },
    { id: 1, name: "Яйца", description: "Категория С1", quantity: 120, minStock: 100, price: 10 },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    minStock: "",
    price: "",
  });

  const totalValue = materials.reduce((sum, m) => sum + m.quantity * m.price, 0);
  const lowStockItems = materials.filter(m => m.quantity < m.minStock).length;

  const handleAddMaterial = () => {
    if (!formData.name || !formData.quantity || !formData.price) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    const newMaterial: Material = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      quantity: Number(formData.quantity),
      minStock: Number(formData.minStock) || 0,
      price: Number(formData.price),
    };

    setMaterials([...materials, newMaterial]);
    setFormData({ name: "", description: "", quantity: "", minStock: "", price: "" });
    setIsDialogOpen(false);
    toast.success("Материал добавлен");
  };

  const salesData = [
    { day: "Пн", amount: 45860 },
    { day: "Вт", amount: 52300 },
    { day: "Ср", amount: 48900 },
    { day: "Чт", amount: 61200 },
    { day: "Пт", amount: 58700 },
    { day: "Сб", amount: 73400 },
    { day: "Вс", amount: 69800 },
  ];

  const maxSales = Math.max(...salesData.map(d => d.amount));

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <header className="bg-[#1A1F2C] text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Cookie" size={32} className="text-[#8B5CF6]" />
            <h1 className="text-2xl font-semibold">Система управления пекарней</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Всего единиц</span>
              <Icon name="Package" size={20} className="text-[#8B5CF6]" />
            </div>
            <p className="text-3xl font-semibold mb-1">{materials.reduce((sum, m) => sum + m.quantity, 0)}</p>
            <span className="text-xs text-gray-400">на складе</span>
          </Card>

          <Card className="p-6 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Товары требуют внимания</span>
              <Icon name="AlertCircle" size={20} className="text-red-500" />
            </div>
            <p className="text-3xl font-semibold mb-1">{lowStockItems}</p>
            <span className="text-xs text-gray-400">низкий запас</span>
          </Card>

          <Card className="p-6 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Общая стоимость</span>
              <Icon name="DollarSign" size={20} className="text-green-500" />
            </div>
            <p className="text-3xl font-semibold mb-1">{totalValue.toLocaleString()} ₽</p>
            <span className="text-xs text-gray-400">всего на складе</span>
          </Card>
        </div>

        <Tabs defaultValue="materials" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="materials" className="gap-2">
              <Icon name="Package" size={18} />
              Материалы
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <Icon name="BarChart3" size={18} />
              Отчеты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="materials">
            <Card className="bg-white border-none shadow-sm">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Склад материалов</h2>
                <Button 
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white"
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Новый материал
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
                      <th className="p-4 font-medium">ID</th>
                      <th className="p-4 font-medium">Название</th>
                      <th className="p-4 font-medium">Описание</th>
                      <th className="p-4 font-medium">Количество</th>
                      <th className="p-4 font-medium">Мин. запас</th>
                      <th className="p-4 font-medium">Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material) => (
                      <tr key={material.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm text-gray-500">{material.id}</td>
                        <td className="p-4 font-medium">{material.name}</td>
                        <td className="p-4 text-sm text-gray-600">{material.description}</td>
                        <td className="p-4">
                          <span className={`font-medium ${material.quantity < material.minStock ? 'text-red-500' : ''}`}>
                            {material.quantity}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{material.minStock}</td>
                        <td className="p-4 font-medium">{material.price} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <Card className="p-6 bg-white border-none shadow-sm">
                <h2 className="text-lg font-semibold mb-6">Продажи за неделю</h2>
                <div className="space-y-4">
                  {salesData.map((day) => (
                    <div key={day.day} className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-600 w-8">{day.day}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#8B5CF6] to-[#6E59A5] h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                          style={{ width: `${(day.amount / maxSales) * 100}%` }}
                        >
                          <span className="text-white text-xs font-semibold">{day.amount.toLocaleString()} ₽</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Icon name="TrendingUp" size={20} className="text-[#8B5CF6]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Средний чек</p>
                      <p className="text-2xl font-semibold">1 245 ₽</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <Icon name="ArrowUp" size={14} />
                    +12% к прошлой неделе
                  </p>
                </Card>

                <Card className="p-6 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Icon name="ShoppingCart" size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Заказов</p>
                      <p className="text-2xl font-semibold">342</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <Icon name="ArrowUp" size={14} />
                    +8% к прошлой неделе
                  </p>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Новый материал</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="name" className="text-sm text-gray-600 mb-2 block">Название</Label>
              <Input
                id="name"
                placeholder="Например: Ножницы"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-gray-200"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm text-gray-600 mb-2 block">Описание</Label>
              <Input
                id="description"
                placeholder="Для чего используется"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity" className="text-sm text-gray-600 mb-2 block">Количество</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="10"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="border-gray-200"
                />
              </div>

              <div>
                <Label htmlFor="minStock" className="text-sm text-gray-600 mb-2 block">Мин. запас</Label>
                <Input
                  id="minStock"
                  type="number"
                  placeholder="5"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                  className="border-gray-200"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="price" className="text-sm text-gray-600 mb-2 block">Цена, ₽</Label>
              <Input
                id="price"
                type="number"
                placeholder="500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="border-gray-200"
              />
            </div>

            <Button 
              onClick={handleAddMaterial}
              className="w-full bg-[#1A1F2C] hover:bg-[#2A2F3C] text-white h-12 text-base"
            >
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
