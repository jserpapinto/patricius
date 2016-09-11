/**********************
**	  TREINADORES
**********************/
db.treinador.insert(
	[
		{
			nome: "João Sampaio",
			imgs: ["",""]
		}
	]
)

/**********************
**	  ÁRBITROS
**********************/
db.arbitro.insert(
	[
		{
			nome: "Miguel",
			dob: 
			torneios: [
				{
					torneio: ObjectID("Original 2016"),
					jogos: [ //jogos que arbitrou 
						{
							jogo: ObjectID("ASDAS"),
							amarelos: 3,
							azuis: 0,
							vermelhos: 0
						},
						{
							jogo: ObjectID("AAAS"),
							amarelos: 1,
							azuis: 2,
							vermelhos: 0
						}
					]
				}
			]
		}
	]
)

/**********************
**		JOGADORES
**********************/
db.jogadores.insert(
	[
		{
			//jogador1
			nome: "serpa",
			anoNascimento: "07-11-1991",
			imgs: "/path/to/link.png",
			cc: "123456789",
			posicao: [ //VALE A PENA???
				"defesa", "medio"
			],
			torneios: [ //torneios jogados
				{
					id: ObjectID("Original 2016"),
					equipas: [ //equipas no torneio, pode ter + q 1
						//equipa1
						{
							id: ObjectID("SARDOES"), //nome ou id?
							jogos: [
								ObjectID("ABAB"), //referencia do jogo
								ObjectID("HJSK")
							]
						}
					]
				},
				{
					id: ObjectID("Abertura Original 2015"),
					equipas: [
						{
							id: ObjectID("SARDOES"),
							jogos: [
								ObjectID("ABAB"),
								ObjectID("HJSK")
							]
						}
					]
				}
			]
		}
	]
)

/**********************
**		EQUIPAS
**********************/
db.equipas.insert(
	[	
		//equipa1
		{
			nome: "BPI",
			anoInicio: 2008,
			imgs: ["/path/to/file.png", "/path/to/file.png2", "/path/to/file.png3"],
			torneios: [
				{
					id: ObjectID("Original 2016"),
					posicaoFinal: 5 // Insere no final
				},
				{
					id: ObjectID("Original 2015"),
					posicaoFinal: 5 // Insere no final
				}
			]
		}
	]
)

/**********************
**		TORNEIOS
**********************/
db.toneios.insert(
	[
		//torneio1
		{
			tipo: "Original",
			ano: 2016,
			imgs: ["/path/to/file.png", "/path/to/file.png2", "/path/to/file.png3"],
			jogos: 
			[
			    {
			        status: 0, //0->ainda nao aconteceu | 1->já aconteceu
			        data: "19-02-2016 17:00:00",
			        campo: "Alcino",
			        imgs: ["/path/to/file.png", "/path/to/file.png2", "/path/to/file.png3"],
			        cronica: "Lorem ipsum dolor sit amet",
			        equipas: [
				        {
					        id: ObjectID("BPI"),
					        treinador: ObjectID("João Sampaio"),
					        capitão: ObjectID("barek"),
					        jogadores: [
						        {
							        nome: ObjectID("serpa"),
							        titular: false,
							        pontuacao: 4, // 1-5
							        numero: 1, // camisola
							        golos: [15,23,35],
							        amarelos: [10],
							        azul: 12,
							        titular: false,
									
						        },
						        {
							        nome: ObjectID("marco"),
							        titular: false,
							        pontuacao: 4, // 1-5
							        numero: 1, // camisola
							        azul: 12
						        {
							        nome: ObjectID("barek"),
							        titular: false,
							        pontuacao: 4, // 1-5
							        numero: 1, // camisola
							        golos: [55],
							        amarelos: [10, 25],
							        vermelho: 25
						        }
					        ]
				        },
				        {
					        id: ObjectID("SARDOES"),
					        treinador: ObjectID("João Sampaio"),
					        delegado: ObjectId("Zé"),
					        capitão: ObjectID("saraiva"),
					        jogadores: [
						        {
							        nome: ObjectID("saraiva"),
							        golos: [15,23,35],
							        amarelos: [10],
							        azul: 12,
							        titular: false,
						        },
						        {
							        nome: ObjectID("marco"),
							        azul: 12
						        },
						        {
							        nome: ObjectID("aires"),
							        golos: [55],
							        amarelos: [10, 25],
							        azul: 25
						        }
					        ]
				        }
			        ],

		        }
			]
		},
		//torneio2
		{
			tipo: "Abertura Original",
			ano: 2015,
			imgs: "/path/to/file.png",
			final: {
				vencedor: {
					nome: "BPI",
					golos: 4,
					penalty: 0
				}, 
				vencido: {
					nome: "Sardões",
					golos: 2,
					penalty: 0
				}
			}
		},
		//torneio3
		{
			tipo: "Original",
			ano: 2015,
			imgs: "/path/to/file.png",
			final: {
				vencedor: {
					nome: "BPI",
					golos: 4,
					penalty: 2
				}, 
				vencido: {
					nome: "Sardões",
					golos: 4,
					penalty: 4
				}
			}
		}
	]
)