"use client";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";

import { useEffect, useState } from "react";

import { GET, POST } from '../api/pecas/route.js';

interface Peca {
    id: number,
    nome: string,
    preco: number,
}

export default function Layout() {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [pecas, setPecas] = useState<Peca[]>([]);

    // Estados para o filtro
    const [filtroId, setFiltroId] = useState("");
    const [filtroNome, setFiltroNome] = useState("");

    async function enviarDados(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await POST(nome, preco);
        setNome("");
        setPreco("");
        receberDados();
        console.log("Peça cadastrada!");
    };

    async function receberDados() {
        const pecasRecebidas = await GET(); // Aguarda os dados serem buscados
        setPecas(pecasRecebidas); // Atualiza o estado com as peças recebidas
        console.log("Peças recebidas!");
    }

    useEffect(() => {
        receberDados();
    }, []);

    // Lista filtrada de peças
    const pecasFiltradas = pecas.filter((peca) => {
        const idCorrespondente =
            filtroId.length === 0 || peca.id.toString().startsWith(filtroId);
        const nomeCorrespondente =
            filtroNome.length === 0 ||
            peca.nome.toLowerCase().startsWith(filtroNome.toLowerCase());

        return idCorrespondente && nomeCorrespondente;
    });

    return (
        <div className="p-6 space-y-4 max-lg:p-4">
            <div className="flex flex-col justify-between items-start gap-4">
                <h1 className="text-xl font-bold">Peças Cadastradas</h1>

                <div className="flex items-center justify-between gap-2 w-full max-lg:flex-col">
                    <form className="flex items-center gap-2 max-lg:w-full">
                        <Input
                            id="idpeca"
                            placeholder="ID da peça"
                            value={filtroId}
                            onChange={(e) => setFiltroId(e.target.value)}
                        />
                        <Input
                            id="nomepeca"
                            placeholder="Nome da peça"
                            value={filtroNome}
                            onChange={(e) => setFiltroNome(e.target.value)}
                        />
                    </form>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="max-lg:w-full"><PlusCircle />Nova Peça</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] max-lg:max-w-[350px] max-lg:rounded-lg">
                            <DialogHeader>
                                <DialogTitle>Nova Peça</DialogTitle>
                                <DialogDescription>
                                    Cadastre uma nova peça
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={enviarDados} className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="nome" className="text-right">
                                        Nome
                                    </Label>
                                    <Input
                                        id="nome"
                                        placeholder="Parafuso"
                                        className="col-span-3"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="preco" className="text-right">
                                        Preço
                                    </Label>
                                    <Input
                                        id="preco"
                                        placeholder="10,00"
                                        className="col-span-3"
                                        value={preco}
                                        onChange={(e) => setPreco(e.target.value)}
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" onClick={() => setOpen(false)}>Cadastrar</Button>
                                </DialogFooter>
                            </form>

                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="border rounded-lg p-2">
                <Table>
                    <TableHeader>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Preço</TableHead>
                    </TableHeader>
                    <TableBody>
                        {pecasFiltradas.length > 0 ? (
                            pecasFiltradas.map((peca: Peca) => (
                                <TableRow key={peca.id}>
                                    <TableCell>{peca.id}</TableCell>
                                    <TableCell>{peca.nome}</TableCell>
                                    <TableCell>
                                        {"R$ " +
                                            peca.preco.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    Nenhuma peça encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
