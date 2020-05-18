export default ({ body, data }) => {
  const data_ = JSON.parse(data);
  return `
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${data_.text.title}</title>
            <meta name="description" content="${data_.text.meta_desc}">
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700,900&display=swap&subset=cyrillic-ext"
                rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap&subset=cyrillic-ext" rel="stylesheet">
            <link rel="stylesheet" href="/admin/style.css">
            <script>
                window.STATE = ${data};
                localStorage.setItem('DATA', ${JSON.stringify(data)})
            </script>
        </head>
        <body>
            <div id="root">${body}</div>
        </body>
        <script src="/admin.js" charset="utf-8" async></script>
        </html>
        `;
};
