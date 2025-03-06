
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DollarSign, Plus } from "lucide-react";
import { Card } from "./ui/card";

export function TransactionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" />
          Nova Transação
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white/80 backdrop-blur-sm border border-gray-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Nova Transação
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">Tipo de Transação</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="receivable">A Receber</option>
              <option value="payable">A Pagar</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">Descrição</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Ex: Pagamento Cliente A"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">Valor</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="R$ 0,00"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">Data de Vencimento</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">
              Cancelar
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all">
              Salvar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
