# El Grimorio de las 12 Palabras de San Benito — LATAM

Versão em espanhol neutro da página de vendas original, preservando a mesma estrutura de conversão para público frio, a mesma ordem das 13 seções, o design e os comportamentos da versão em português.

## Antes de publicar

Abra `index.html` e ajuste somente estes dados comerciais:

1. `data-checkout-url`: substitua pelo checkout LATAM definitivo.
2. Todos os atributos `href` com o checkout antigo: substitua pelo mesmo checkout LATAM.
3. `META_PIXEL_ID`: substitua pelo Pixel usado na campanha LATAM, caso seja diferente.
4. Link `wa.me`: confirme o número de atendimento e mantenha a mensagem em espanhol.
5. Preço: o arquivo está preparado com `US$ 7,90`; altere o texto e os valores do Pixel se sua oferta usar outro preço.

## Publicação

Suba `index.html`, `vercel.json` e a pasta `assets` para a raiz do repositório no GitHub. Na Vercel, importe o repositório sem comando de build.

## Observação sobre os depoimentos

Os três vídeos foram mantidos exatamente como na página original. Se você já tiver depoimentos em espanhol, troque apenas os IDs presentes em `data-youtube-id`, sem alterar a seção.
