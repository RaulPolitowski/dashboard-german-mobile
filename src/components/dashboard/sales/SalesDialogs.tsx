
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";

interface Sale {
  id: number;
  datetime: string;
  value: number;
  paymentMethod: string;
  seller: string;
}

interface SalesDialogsProps {
  showDailySales: boolean;
  showMonthlySales: boolean;
  onDailySalesClose: () => void;
  onMonthlySalesClose: () => void;
  todaysSales: Sale[];
}

export const SalesDialogs = ({ 
  showDailySales, 
  showMonthlySales, 
  onDailySalesClose, 
  onMonthlySalesClose, 
  todaysSales 
}: SalesDialogsProps) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  
  // Simular vendas do mês atual
  const monthSales = [
    ...todaysSales,
    { 
      id: 4, 
      datetime: "2024-02-19T14:30:00", 
      value: 750.00, 
      paymentMethod: "Cartão de Crédito",
      seller: "Ana Paula"
    },
    { 
      id: 5, 
      datetime: "2024-02-18T16:45:00", 
      value: 1200.00, 
      paymentMethod: "PIX",
      seller: "Pedro Santos"
    }
  ];

  return (
    <>
      <Dialog open={showDailySales} onOpenChange={onDailySalesClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">Vendas do Dia</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Horário</TableHead>
                  <TableHead className="dark:text-gray-300">Valor</TableHead>
                  <TableHead className="dark:text-gray-300">Forma de Pagamento</TableHead>
                  <TableHead className="dark:text-gray-300">Vendedor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todaysSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="dark:text-gray-300">
                      {new Date(sale.datetime).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">R$ {sale.value.toLocaleString()}</TableCell>
                    <TableCell className="dark:text-gray-300">{sale.paymentMethod}</TableCell>
                    <TableCell className="dark:text-gray-300">{sale.seller}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showMonthlySales} onOpenChange={onMonthlySalesClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">Vendas de {currentMonth}</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Data/Hora</TableHead>
                  <TableHead className="dark:text-gray-300">Valor</TableHead>
                  <TableHead className="dark:text-gray-300">Forma de Pagamento</TableHead>
                  <TableHead className="dark:text-gray-300">Vendedor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="dark:text-gray-300">
                      {new Date(sale.datetime).toLocaleDateString()} {' '}
                      {new Date(sale.datetime).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">R$ {sale.value.toLocaleString()}</TableCell>
                    <TableCell className="dark:text-gray-300">{sale.paymentMethod}</TableCell>
                    <TableCell className="dark:text-gray-300">{sale.seller}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
