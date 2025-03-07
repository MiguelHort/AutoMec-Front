import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function Layout() {


  return (

    <ScrollArea className="w-full h-dvh p-4">
      <section className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col p-10">
          <h1 className="text-xl mb-4 text-blue-600 bg-blue-100 p-2 w-fit rounded-md">Bom dia!</h1>
          <p>Ficamos muito felizes de ter você conosco nessa busca pela organização academica</p>
        </Card>
        <Card className="p-10 row-span-2">
          <h1 className="text-xl font-bold mb-6">Usuarios:</h1>
        </Card>
        <Card className="p-10">
          <h1 className="text-xl mb-4">Bom dia!</h1>
          <p>Ficamos muito felizes de ter você conosco nessa busca pela organização academica</p>
        </Card>
      </section>
    </ScrollArea>

  )
}
