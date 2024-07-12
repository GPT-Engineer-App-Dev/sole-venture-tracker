import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-03-15", amount: 200, type: "expense", brand: "Nike" },
    { id: 2, date: "2023-03-20", amount: 150, type: "income", brand: "Adidas" },
    { id: 3, date: "2023-03-25", amount: 180, type: "expense", brand: "Puma" },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
    type: "",
    brand: "",
  });

  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTransaction) {
      setEditingTransaction((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewTransaction((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name, value) => {
    if (editingTransaction) {
      setEditingTransaction((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewTransaction((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTransaction) {
      setTransactions(transactions.map(t => t.id === editingTransaction.id ? editingTransaction : t));
      setEditingTransaction(null);
    } else {
      const id = transactions.length + 1;
      setTransactions([...transactions, { id, ...newTransaction }]);
      setNewTransaction({ date: "", amount: "", type: "", brand: "" });
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sneaker Accounting</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={editingTransaction ? editingTransaction.date : newTransaction.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={editingTransaction ? editingTransaction.amount : newTransaction.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select 
              name="type" 
              onValueChange={(value) => handleSelectChange("type", value)} 
              value={editingTransaction ? editingTransaction.type : newTransaction.type}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Select 
              name="brand" 
              onValueChange={(value) => handleSelectChange("brand", value)} 
              value={editingTransaction ? editingTransaction.brand : newTransaction.brand}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Puma">Puma</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit">{editingTransaction ? 'Update' : 'Add'} Transaction</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.brand}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(transaction)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Transaction</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="edit-date">Date</Label>
                        <Input
                          type="date"
                          id="edit-date"
                          name="date"
                          value={editingTransaction?.date || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-amount">Amount</Label>
                        <Input
                          type="number"
                          id="edit-amount"
                          name="amount"
                          value={editingTransaction?.amount || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-type">Type</Label>
                        <Select 
                          name="type" 
                          onValueChange={(value) => handleSelectChange("type", value)} 
                          value={editingTransaction?.type || ''}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="edit-brand">Brand</Label>
                        <Select 
                          name="brand" 
                          onValueChange={(value) => handleSelectChange("brand", value)} 
                          value={editingTransaction?.brand || ''}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Nike">Nike</SelectItem>
                            <SelectItem value="Adidas">Adidas</SelectItem>
                            <SelectItem value="Puma">Puma</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit">Update Transaction</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(transaction.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;