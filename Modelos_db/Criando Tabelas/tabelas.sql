CREATE TABLE produtos (
   id INTEGER PRIMARY KEY,
   cod_prod TEXT NOT NULL,
   descr_resumida TEXT NOT NULL,
   descr_detalhada TEXT NOT NULL,
   preco INTEGER NOT NULL,
   unidade TEXT NOT NULL
);

CREATE TABLE clientes (
   id INTEGER PRIMARY KEY,
   cod INTEGER,
   nome TEXT,
   cnpj TEXT,
   endereco TEXT,
   bairro TEXT,
   cidade TEXT,
   cep TEXT,
   uf TEXT,
   email TEXT,
   ddd TEXT,
   fone1 TEXT,
   fone2 TEXT,
   celular TEXT,
   fax TEXT,
   fantasia TEXT,
   numero TEXT
);

CREATE TABLE usuarios (
   id INTEGER PRIMARY KEY,
   nome TEXT NOT NULL,
   cpf TEXT NOT NULL,
   email TEXT NOT NULL,
   senha TEXT NOT NULL,
   privilegio INTEGER
);

INSERT INTO produtos (
   cod_prod,
   descr_resumida,
   descr_detalhada, 
   preco, 
   unidade
)VALUES (
   "004FBR1634",
   "FB 102 FE/PU RO",
   "RODIZIO DE AÇO FIXO FM 102 UFS 10\",
   183,
   "PECA"
),(
   "004GBR1635",
   "GB 102 FE/PU RO",
   "RODIZIO DE AÇO GIRATÓRIO GM 102 UFS 10\",
   252,
   "PECA"
), (
   "004RO1484",
   "KIT 3/8 - L14",
   "KIT PARAFUSO E PORCA 3/8x67 DA LINHA 14 LEVE",
   1.2,
   "PECA"
)

INSERT INTO clientes (
   cod,
   nome,
   cnpj,
   endereco,
   bairro,
   cidade,
   cep,
   uf,
   email,
   ddd,
   fone1,
   fone2,
   celular,
   fax,
   fantasia,
   numero
) VALUES (
   1,
   "KMB INDÚSTRIA E COMÉRCIO LTDA EPP",
   "05440364000106",
   "RUA PROFESSOR WALTER WEY",
   "VILA INDUSTRIAL",
   "SAO PAULO",
   "03257150",
   "SP",
   "kmb@kmbrodizios.com.br",
   "11",
   27035745,
   21430452,
   0,
   0,
   "KMB RODIOZIOS",
   "237"
), (
   2,
   "INFORMAL INFORMATICA",
   "03093693000100",
   "Av. ITABERABA",
   "FREGUESIA DO O",
   "SAO PAULO",
   "02734000",
   "SP",
   "compreaki@compreaki.com.br",
   "11",
   39922999,
   39752272,
   0,
   0,
   "INFORMAL",
   "968"
), (
   4,
   "617 B MERCADO DA BORRACHA LTDA",
   "05245187000107",
   "RUA FIGUEIRA DE MELO",
   "SAO CRISTOVAO",
   "RIO DE JANEIRO",
   "20941001",
   "RJ",
   "adm@mercadodaborracha.com.br",
   "21",
   38916604,
   0,
   0,
   0,
   "617 B",
   "367"
);

INSERT INTO usuarios (
   nome,
   cpf,
   email,
   senha,
   privilegio
) VALUES (
   "ADM",
   "835.330.430-96",
   "adm@gmail.com",
   "123",
   1
), (
   "Wiaro Deirey",
   "523.577.870-74",
   "2d@gmail.com",
   "123",
   0
), (
   "Largdeaog Ulatacu",
   "243.239.290-64",
   "lu@gmail.com",
   "123",
   0
);