export async function GET() {
  try {
    // Altere para o endpoint correto que retorna id, nome e preço
    const response = await fetch("https://automec-back-production.up.railway.app/pecas");

    if (!response.ok) throw new Error("Erro ao buscar peças");

    const data = await response.json();

    // Garante que o JSON seja um array antes de retornar
    if (!Array.isArray(data)) {
      throw new Error("Resposta da API não é um array válido");
    }

    return data;

  } catch (error) {
    console.error("Erro na API:", error);

    return data;
  }
}

export async function POST(nome, preco) {
  try {
    // Altere para o endpoint correto que retorna id, nome e preço
    const response = await fetch('https://automec-back-production.up.railway.app/pecas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, preco }),
    });

    if (!response.ok) throw new Error("Erro ao adicionar peça");

    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (error) {
    console.error("Erro na API:", error);

    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
