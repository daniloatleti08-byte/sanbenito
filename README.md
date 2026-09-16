# Las 12 Palabras de San Benito — LATAM

Página de ventas estática em espanhol neutro, pronta para GitHub Pages ou Vercel.

## Configuração antes do lançamento

Edite `config.js` e informe:

- `checkoutDefault`: checkout geral para países não mapeados;
- `checkoutByCountry`: links específicos para México, Colômbia, Peru e Chile;
- `supportEmail`: e-mail real de suporte;
- `metaPixelId`: ID do Pixel da Meta, se aplicável.

Os preços também ficam em `script.js`, dentro do objeto `prices`. Eles precisam corresponder exatamente ao valor configurado no checkout de cada país.

## Publicação na Vercel

Importe o repositório na Vercel. O projeto é estático e não exige comando de build. A pasta de saída é a raiz do repositório.

## Estrutura

- `index.html`: copy e estrutura da página;
- `styles.css`: identidade visual e responsividade;
- `script.js`: seletor de país, preço, CTA e eventos;
- `config.js`: URLs comerciais e integrações;
- `assets/`: capa do ebook e imagem do complemento em áudio.
