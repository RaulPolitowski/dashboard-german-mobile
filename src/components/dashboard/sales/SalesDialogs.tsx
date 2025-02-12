
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
            <DialogTitle className="dark:text-gray-100">Previsão de Vendas - Próximo Mês</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Data</TableHead>
                  <TableHead className="dark:text-gray-300">Valor Previsto</TableHead>
                  <TableHead className="dark:text-gray-300">Base Histórica</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="dark:text-gray-300">01/03/2024</TableCell>
                  <TableCell className="dark:text-gray-300">R$ 52.300,00</TableCell>
                  <TableCell className="dark:text-gray-300">+14% vs. mês atual</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
