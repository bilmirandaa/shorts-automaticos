# Shorts Cloud Starter

Template educacional para Shorts ilustrados por código, sem narração.

## Publicação usando apenas o navegador
1. Crie um repositório público no GitHub.
2. Envie os arquivos desta pasta respeitando os caminhos, inclusive `.github/workflows/render.yml`.
3. Abra a aba Actions > Renderizar Shorts > Run workflow.
4. Quando o job ficar verde, abra o job e baixe o artefato `shorts-mp4`.
5. Para alterar o vídeo, edite `src/story.json`: mude title e cada caption/visual/background.
6. Ao fazer commit das alterações, o workflow roda automaticamente.

Atenção: este é um protótipo visual simples para verificar o sistema. Ele mostra frases sobre a notícia e desenhos SVG básicos; ainda não interpreta roteiros nem pesquisa notícias automaticamente. O Claude pode ajudar a editar os arquivos para enriquecer as cenas. Cada cena dura 4s, portanto use frases curtas para leitura.

Compatível com uso de Node/Remotion em CI. Pode precisar de ajustes por mudanças nas dependências e no runner.
