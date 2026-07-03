import { useState, useEffect } from "react"
import { MdAdd, MdDelete, MdClose, MdTrendingUp, MdTrendingDown } from "react-icons/md"
import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { FaWallet } from "react-icons/fa"

export default function FinanceTracker() {
    const [transactions, setTransactions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        type: "expense",
        category: "food",
        amount: "",
        description: ""
    });

    const categories = {
        expense: ['food', 'transport', 'shopping', 'bills', 'entertainment', 'other'],
        income: ['salary', 'freelance', 'investment', 'gift', 'other']
    };

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('transactions') || '[]');
        setTransactions(saved);
    }, []);

    const saveTransactions = (updated) => {
        localStorage.setItem('transactions', JSON.stringify(updated));
        setTransactions(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const transaction = {
            ...newTransaction,
            id: Date.now(),
            amount: parseFloat(newTransaction.amount),
            date: new Date().toISOString()
        };
        saveTransactions([transaction, ...transactions]);
        setNewTransaction({ type: "expense", category: "food", amount: "", description: "" });
        setShowForm(false);
    };

    const deleteTransaction = (id) => {
        if (confirm("Delete this transaction?")) {
            saveTransactions(transactions.filter(t => t.id !== id));
        }
    };

    const totals = transactions.reduce((acc, t) => {
        if (t.type === 'income') acc.income += t.amount;
        else acc.expense += t.amount;
        return acc;
    }, { income: 0, expense: 0 });

    const balance = totals.income - totals.expense;

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-linear-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <FaWallet className="text-emerald-400 text-2xl" />
                        <span className="text-gray-400">Balance</span>
                    </div>
                    <p className={`text-3xl font-bold ${balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        ${balance.toFixed(2)}
                    </p>
                </div>

                <div className="bg-linear-to-br from-green-500/20 to-teal-500/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <MdTrendingUp className="text-green-400 text-2xl" />
                        <span className="text-gray-400">Income</span>
                    </div>
                    <p className="text-3xl font-bold text-green-400">${totals.income.toFixed(2)}</p>
                </div>

                <div className="bg-linear-to-br from-red-500/20 to-orange-500/20 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <MdTrendingDown className="text-red-400 text-2xl" />
                        <span className="text-gray-400">Expenses</span>
                    </div>
                    <p className="text-3xl font-bold text-red-400">${totals.expense.toFixed(2)}</p>
                </div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <RiMoneyDollarCircleLine className="text-emerald-400" />
                    Transactions
                </h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all flex items-center gap-2"
                >
                    {showForm ? <MdClose /> : <MdAdd />}
                    {showForm ? 'Cancel' : 'Add Transaction'}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <select
                            value={newTransaction.type}
                            onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value, category: categories[e.target.value][0]})}
                            className="bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                        <select
                            value={newTransaction.category}
                            onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                            className="bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {categories[newTransaction.type].map(cat => (
                                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Amount"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                        className="w-full bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description (optional)"
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                        className="w-full bg-slate-800/50 border border-emerald-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-3 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all font-semibold"
                    >
                        Add Transaction
                    </button>
                </form>
            )}

            {/* Transactions List */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl overflow-hidden">
                <div className="max-h-96 overflow-y-auto">
                    {transactions.map(transaction => (
                        <div
                            key={transaction.id}
                            className="p-4 border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    transaction.type === 'income' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                }`}>
                                    {transaction.type === 'income' ? <MdTrendingUp size={24} /> : <MdTrendingDown size={24} />}
                                </div>
                                <div>
                                    <p className="text-white font-semibold capitalize">{transaction.category}</p>
                                    <p className="text-gray-400 text-sm">{transaction.description || 'No description'}</p>
                                    <p className="text-gray-500 text-xs">{new Date(transaction.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`text-xl font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                </span>
                                <button
                                    onClick={() => deleteTransaction(transaction.id)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <MdDelete size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {transactions.length === 0 && !showForm && (
                <div className="text-center py-12 text-gray-500">
                    No transactions yet. Start tracking your finances!
                </div>
            )}
        </div>
    );
}
