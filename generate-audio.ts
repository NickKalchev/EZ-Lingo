import axios from 'axios';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  console.error('❌ ELEVENLABS_API_KEY not found in environment variables');
  console.log('Please add ELEVENLABS_API_KEY to your .env file');
  process.exit(1);
}

// ElevenLabs multilingual voice IDs
// Replace 'pNInz6obpgDQGcFmaJgB' with your chosen voice ID from ElevenLabs
const languageConfig = {
  Spanish: { voiceId: 'UgBBYS2sOqTuMpoF3BR0' },
  Bulgarian: { voiceId: 'UgBBYS2sOqTuMpoF3BR0' },
  Czech: { voiceId: 'UgBBYS2sOqTuMpoF3BR0' },
  French: { voiceId: 'UgBBYS2sOqTuMpoF3BR0' },
  German: { voiceId: 'UgBBYS2sOqTuMpoF3BR0' },
  Italian: { voiceId: 'UgBBYS2sOqTuMpoF3BR0' }
};

// Complete vocabulary for ALL languages with audio file paths
const LANGUAGE_CONTENT: Record<string, any> = {
  Spanish: {
    basics: [
      { text: "Hola", audioSrc: "/es/hola.mp3" },
      { text: "Adiós", audioSrc: "/es/adios.mp3" },
      { text: "Por favor", audioSrc: "/es/por_favor.mp3" },
      { text: "Gracias", audioSrc: "/es/gracias.mp3" },
      { text: "Lo siento", audioSrc: "/es/lo_siento.mp3" },
      { text: "Perdón", audioSrc: "/es/perdon.mp3" }
    ],
    phrases: [
      { text: "¿Cómo estás?", audioSrc: "/es/como_estas.mp3" },
      { text: "¿Cómo te llamas?", audioSrc: "/es/como_te_llamas.mp3" },
      { text: "Me llamo...", audioSrc: "/es/me_llamo.mp3" },
      { text: "No entiendo", audioSrc: "/es/no_entiendo.mp3" },
      { text: "¿Hablas inglés?", audioSrc: "/es/hablas_ingles.mp3" }
    ],
    numbers: [
      { text: "Uno", audioSrc: "/es/uno.mp3" },
      { text: "Dos", audioSrc: "/es/dos.mp3" },
      { text: "Tres", audioSrc: "/es/tres.mp3" },
      { text: "Cuatro", audioSrc: "/es/cuatro.mp3" },
      { text: "Cinco", audioSrc: "/es/cinco.mp3" },
      { text: "Seis", audioSrc: "/es/seis.mp3" },
      { text: "Siete", audioSrc: "/es/siete.mp3" },
      { text: "Ocho", audioSrc: "/es/ocho.mp3" },
      { text: "Nueve", audioSrc: "/es/nueve.mp3" },
      { text: "Diez", audioSrc: "/es/diez.mp3" }
    ],
    colors: [
      { text: "Rojo", audioSrc: "/es/rojo.mp3" },
      { text: "Azul", audioSrc: "/es/azul.mp3" },
      { text: "Verde", audioSrc: "/es/verde.mp3" },
      { text: "Amarillo", audioSrc: "/es/amarillo.mp3" },
      { text: "Negro", audioSrc: "/es/negro.mp3" },
      { text: "Blanco", audioSrc: "/es/blanco.mp3" },
      { text: "Naranja", audioSrc: "/es/naranja.mp3" },
      { text: "Morado", audioSrc: "/es/morado.mp3" }
    ],
    family: [
      { text: "Madre", audioSrc: "/es/madre.mp3" },
      { text: "Padre", audioSrc: "/es/padre.mp3" },
      { text: "Hermano", audioSrc: "/es/hermano.mp3" },
      { text: "Hermana", audioSrc: "/es/hermana.mp3" },
      { text: "Hijo", audioSrc: "/es/hijo.mp3" },
      { text: "Hija", audioSrc: "/es/hija.mp3" },
      { text: "Familia", audioSrc: "/es/familia.mp3" },
      { text: "Padres", audioSrc: "/es/padres.mp3" }
    ],
    animals: [
      { text: "Perro", audioSrc: "/es/perro.mp3" },
      { text: "Gato", audioSrc: "/es/gato.mp3" },
      { text: "Pájaro", audioSrc: "/es/pajaro.mp3" },
      { text: "Pez", audioSrc: "/es/pez.mp3" },
      { text: "Caballo", audioSrc: "/es/caballo.mp3" },
      { text: "Vaca", audioSrc: "/es/vaca.mp3" },
      { text: "Pollo", audioSrc: "/es/pollo.mp3" },
      { text: "Conejo", audioSrc: "/es/conejo.mp3" }
    ],
    food: [
      { text: "Agua", audioSrc: "/es/agua.mp3" },
      { text: "Pan", audioSrc: "/es/pan.mp3" },
      { text: "Queso", audioSrc: "/es/queso.mp3" },
      { text: "Manzana", audioSrc: "/es/manzana.mp3" },
      { text: "Plátano", audioSrc: "/es/platano.mp3" },
      { text: "Café", audioSrc: "/es/cafe.mp3" },
      { text: "Té", audioSrc: "/es/te.mp3" },
      { text: "Leche", audioSrc: "/es/leche.mp3" }
    ],
    places: [
      { text: "Escuela", audioSrc: "/es/escuela.mp3" },
      { text: "Hospital", audioSrc: "/es/hospital.mp3" },
      { text: "Restaurante", audioSrc: "/es/restaurante.mp3" },
      { text: "Parque", audioSrc: "/es/parque.mp3" },
      { text: "Tienda", audioSrc: "/es/tienda.mp3" },
      { text: "Banco", audioSrc: "/es/banco.mp3" },
      { text: "Hotel", audioSrc: "/es/hotel.mp3" }
    ],
    transportation: [
      { text: "Coche", audioSrc: "/es/coche.mp3" },
      { text: "Autobús", audioSrc: "/es/autobus.mp3" },
      { text: "Tren", audioSrc: "/es/tren.mp3" },
      { text: "Bicicleta", audioSrc: "/es/bicicleta.mp3" },
      { text: "Avión", audioSrc: "/es/avion.mp3" },
      { text: "Estación", audioSrc: "/es/estacion.mp3" },
      { text: "Billete", audioSrc: "/es/billete.mp3" }
    ],
    clothing: [
      { text: "Camisa", audioSrc: "/es/camisa.mp3" },
      { text: "Pantalones", audioSrc: "/es/pantalones.mp3" },
      { text: "Zapatos", audioSrc: "/es/zapatos.mp3" },
      { text: "Sombrero", audioSrc: "/es/sombrero.mp3" },
      { text: "Vestido", audioSrc: "/es/vestido.mp3" },
      { text: "Chaqueta", audioSrc: "/es/chaqueta.mp3" },
      { text: "Calcetines", audioSrc: "/es/calcetines.mp3" }
    ]
  },
  Bulgarian: {
    basics: [
      { text: "Здравей", audioSrc: "/bg/zdravei.mp3" },
      { text: "Довиждане", audioSrc: "/bg/dovijdane.mp3" },
      { text: "Моля", audioSrc: "/bg/molya.mp3" },
      { text: "Благодаря", audioSrc: "/bg/blagodarya.mp3" },
      { text: "Съжалявам", audioSrc: "/bg/sazhalyavam.mp3" },
      { text: "Извинете", audioSrc: "/bg/izvinete.mp3" }
    ],
    phrases: [
      { text: "Как си?", audioSrc: "/bg/kak_si.mp3" },
      { text: "Как се казваш?", audioSrc: "/bg/kak_se_kazvash.mp3" },
      { text: "Казвам се...", audioSrc: "/bg/kazvam_se.mp3" },
      { text: "Не разбирам", audioSrc: "/bg/ne_razbiram.mp3" },
      { text: "Говориш ли английски?", audioSrc: "/bg/govorish_li_angliyski.mp3" }
    ],
    numbers: [
      { text: "Едно", audioSrc: "/bg/edno.mp3" },
      { text: "Две", audioSrc: "/bg/dve.mp3" },
      { text: "Три", audioSrc: "/bg/tri.mp3" },
      { text: "Четири", audioSrc: "/bg/chetiri.mp3" },
      { text: "Пет", audioSrc: "/bg/pet.mp3" },
      { text: "Шест", audioSrc: "/bg/shest.mp3" },
      { text: "Седем", audioSrc: "/bg/sedem.mp3" },
      { text: "Осем", audioSrc: "/bg/osem.mp3" },
      { text: "Девет", audioSrc: "/bg/devet.mp3" },
      { text: "Десет", audioSrc: "/bg/deset.mp3" }
    ],
    colors: [
      { text: "Червен", audioSrc: "/bg/cherven.mp3" },
      { text: "Син", audioSrc: "/bg/sin.mp3" },
      { text: "Зелен", audioSrc: "/bg/zelen.mp3" },
      { text: "Жълт", audioSrc: "/bg/zhelt.mp3" },
      { text: "Черен", audioSrc: "/bg/cheren.mp3" },
      { text: "Бял", audioSrc: "/bg/byal.mp3" },
      { text: "Оранжев", audioSrc: "/bg/oranzhev.mp3" },
      { text: "Лилав", audioSrc: "/bg/lilav.mp3" }
    ],
    family: [
      { text: "Майка", audioSrc: "/bg/mayka.mp3" },
      { text: "Баща", audioSrc: "/bg/bashta.mp3" },
      { text: "Брат", audioSrc: "/bg/brat.mp3" },
      { text: "Сестра", audioSrc: "/bg/sestra.mp3" },
      { text: "Син", audioSrc: "/bg/sin.mp3" },
      { text: "Дъщеря", audioSrc: "/bg/dashtyerya.mp3" },
      { text: "Семейство", audioSrc: "/bg/semeystvo.mp3" },
      { text: "Родители", audioSrc: "/bg/roditeli.mp3" }
    ],
    animals: [
      { text: "Куче", audioSrc: "/bg/kuche.mp3" },
      { text: "Котка", audioSrc: "/bg/kotka.mp3" },
      { text: "Птица", audioSrc: "/bg/ptitsa.mp3" },
      { text: "Риба", audioSrc: "/bg/riba.mp3" },
      { text: "Кон", audioSrc: "/bg/kon.mp3" },
      { text: "Крава", audioSrc: "/bg/krava.mp3" },
      { text: "Пиле", audioSrc: "/bg/pile.mp3" },
      { text: "Заек", audioSrc: "/bg/zaek.mp3" }
    ],
    food: [
      { text: "Вода", audioSrc: "/bg/voda.mp3" },
      { text: "Хляб", audioSrc: "/bg/hlyab.mp3" },
      { text: "Сирене", audioSrc: "/bg/sirene.mp3" },
      { text: "Ябълка", audioSrc: "/bg/yabalka.mp3" },
      { text: "Банана", audioSrc: "/bg/banana.mp3" },
      { text: "Кафе", audioSrc: "/bg/kafe.mp3" },
      { text: "Чай", audioSrc: "/bg/chay.mp3" },
      { text: "Мляко", audioSrc: "/bg/mlyako.mp3" }
    ],
    places: [
      { text: "Училище", audioSrc: "/bg/uchilishte.mp3" },
      { text: "Болница", audioSrc: "/bg/bolnitsa.mp3" },
      { text: "Ресторант", audioSrc: "/bg/restorant.mp3" },
      { text: "Парк", audioSrc: "/bg/park.mp3" },
      { text: "Магазин", audioSrc: "/bg/magazin.mp3" },
      { text: "Банка", audioSrc: "/bg/banka.mp3" },
      { text: "Хотел", audioSrc: "/bg/hotel.mp3" }
    ],
    transportation: [
      { text: "Кола", audioSrc: "/bg/kola.mp3" },
      { text: "Автобус", audioSrc: "/bg/avtobus.mp3" },
      { text: "Влак", audioSrc: "/bg/vlak.mp3" },
      { text: "Колело", audioSrc: "/bg/kolelo.mp3" },
      { text: "Самолет", audioSrc: "/bg/samolet.mp3" },
      { text: "Гара", audioSrc: "/bg/gara.mp3" },
      { text: "Билет", audioSrc: "/bg/bilet.mp3" }
    ],
    clothing: [
      { text: "Риза", audioSrc: "/bg/riza.mp3" },
      { text: "Панталони", audioSrc: "/bg/pantaloni.mp3" },
      { text: "Обувки", audioSrc: "/bg/obuvki.mp3" },
      { text: "Шапка", audioSrc: "/bg/shapka.mp3" },
      { text: "Рокля", audioSrc: "/bg/roklya.mp3" },
      { text: "Яке", audioSrc: "/bg/yake.mp3" },
      { text: "Чорапи", audioSrc: "/bg/chorapi.mp3" }
    ]
  },
  Czech: {
    basics: [
      { text: "Ahoj", audioSrc: "/cz/ahoj.mp3" },
      { text: "Sbohem", audioSrc: "/cz/sbohem.mp3" },
      { text: "Prosím", audioSrc: "/cz/prosim.mp3" },
      { text: "Děkuji", audioSrc: "/cz/dekuji.mp3" },
      { text: "Promiňte", audioSrc: "/cz/prominte.mp3" },
      { text: "Omlouvám se", audioSrc: "/cz/omlouvam_se.mp3" }
    ],
    phrases: [
      { text: "Jak se máš?", audioSrc: "/cz/jak_se_mas.mp3" },
      { text: "Jak se jmenuješ?", audioSrc: "/cz/jak_se_jmenujes.mp3" },
      { text: "Jmenuji se...", audioSrc: "/cz/jmenuji_se.mp3" },
      { text: "Nerozumím", audioSrc: "/cz/nerozumim.mp3" },
      { text: "Mluvíš anglicky?", audioSrc: "/cz/mluvíš_anglicky.mp3" }
    ],
    numbers: [
      { text: "Jeden", audioSrc: "/cz/jeden.mp3" },
      { text: "Dva", audioSrc: "/cz/dva.mp3" },
      { text: "Tři", audioSrc: "/cz/tri.mp3" },
      { text: "Čtyři", audioSrc: "/cz/ctyri.mp3" },
      { text: "Pět", audioSrc: "/cz/pet.mp3" },
      { text: "Šest", audioSrc: "/cz/sest.mp3" },
      { text: "Sedm", audioSrc: "/cz/sedm.mp3" },
      { text: "Osm", audioSrc: "/cz/osm.mp3" },
      { text: "Devět", audioSrc: "/cz/devet.mp3" },
      { text: "Deset", audioSrc: "/cz/deset.mp3" }
    ],
    colors: [
      { text: "Červený", audioSrc: "/cz/cerveny.mp3" },
      { text: "Modrý", audioSrc: "/cz/modry.mp3" },
      { text: "Zelený", audioSrc: "/cz/zeleny.mp3" },
      { text: "Žlutý", audioSrc: "/cz/zluty.mp3" },
      { text: "Černý", audioSrc: "/cz/cerny.mp3" },
      { text: "Bílý", audioSrc: "/cz/bily.mp3" },
      { text: "Oranžový", audioSrc: "/cz/oranzovy.mp3" },
      { text: "Fialový", audioSrc: "/cz/fialovy.mp3" }
    ],
    family: [
      { text: "Matka", audioSrc: "/cz/matka.mp3" },
      { text: "Otec", audioSrc: "/cz/otec.mp3" },
      { text: "Bratr", audioSrc: "/cz/bratr.mp3" },
      { text: "Sestra", audioSrc: "/cz/sestra.mp3" },
      { text: "Syn", audioSrc: "/cz/syn.mp3" },
      { text: "Dcera", audioSrc: "/cz/dcera.mp3" },
      { text: "Rodina", audioSrc: "/cz/rodina.mp3" },
      { text: "Rodiče", audioSrc: "/cz/rodice.mp3" }
    ],
    animals: [
      { text: "Pes", audioSrc: "/cz/pes.mp3" },
      { text: "Kočka", audioSrc: "/cz/kocka.mp3" },
      { text: "Pták", audioSrc: "/cz/ptak.mp3" },
      { text: "Ryba", audioSrc: "/cz/ryba.mp3" },
      { text: "Kůň", audioSrc: "/cz/kun.mp3" },
      { text: "Kráva", audioSrc: "/cz/krava.mp3" },
      { text: "Kuře", audioSrc: "/cz/kure.mp3" },
      { text: "Králík", audioSrc: "/cz/kralik.mp3" }
    ],
    food: [
      { text: "Voda", audioSrc: "/cz/voda.mp3" },
      { text: "Chléb", audioSrc: "/cz/chleb.mp3" },
      { text: "Sýr", audioSrc: "/cz/syr.mp3" },
      { text: "Jablko", audioSrc: "/cz/jablko.mp3" },
      { text: "Banán", audioSrc: "/cz/banan.mp3" },
      { text: "Káva", audioSrc: "/cz/kava.mp3" },
      { text: "Čaj", audioSrc: "/cz/caj.mp3" },
      { text: "Mléko", audioSrc: "/cz/mleko.mp3" }
    ],
    places: [
      { text: "Škola", audioSrc: "/cz/skola.mp3" },
      { text: "Nemocnice", audioSrc: "/cz/nemocnice.mp3" },
      { text: "Restaurace", audioSrc: "/cz/restaurace.mp3" },
      { text: "Park", audioSrc: "/cz/park.mp3" },
      { text: "Obchod", audioSrc: "/cz/obchod.mp3" },
      { text: "Banka", audioSrc: "/cz/banka.mp3" },
      { text: "Hotel", audioSrc: "/cz/hotel.mp3" }
    ],
    transportation: [
      { text: "Auto", audioSrc: "/cz/auto.mp3" },
      { text: "Autobus", audioSrc: "/cz/autobus.mp3" },
      { text: "Vlak", audioSrc: "/cz/vlak.mp3" },
      { text: "Kolo", audioSrc: "/cz/kolo.mp3" },
      { text: "Letadlo", audioSrc: "/cz/letadlo.mp3" },
      { text: "Stanice", audioSrc: "/cz/stanice.mp3" },
      { text: "Jízdenka", audioSrc: "/cz/jizdenka.mp3" }
    ],
    clothing: [
      { text: "Košile", audioSrc: "/cz/kosile.mp3" },
      { text: "Kalhoty", audioSrc: "/cz/kalhoty.mp3" },
      { text: "Boty", audioSrc: "/cz/boty.mp3" },
      { text: "Klobouk", audioSrc: "/cz/klobouk.mp3" },
      { text: "Šaty", audioSrc: "/cz/saty.mp3" },
      { text: "Bunda", audioSrc: "/cz/bunda.mp3" },
      { text: "Ponožky", audioSrc: "/cz/ponozky.mp3" }
    ]
  },
  French: {
    basics: [
      { text: "Bonjour", audioSrc: "/fr/bonjour.mp3" },
      { text: "Au revoir", audioSrc: "/fr/au_revoir.mp3" },
      { text: "S'il vous plaît", audioSrc: "/fr/sil_vous_plait.mp3" },
      { text: "Merci", audioSrc: "/fr/merci.mp3" },
      { text: "Désolé", audioSrc: "/fr/desole.mp3" },
      { text: "Excusez-moi", audioSrc: "/fr/excusez_moi.mp3" }
    ],
    phrases: [
      { text: "Comment allez-vous?", audioSrc: "/fr/comment_allez_vous.mp3" },
      { text: "Comment vous appelez-vous?", audioSrc: "/fr/comment_vous_appelez_vous.mp3" },
      { text: "Je m'appelle...", audioSrc: "/fr/je_mappelle.mp3" },
      { text: "Je ne comprends pas", audioSrc: "/fr/je_ne_comprends_pas.mp3" },
      { text: "Parlez-vous anglais?", audioSrc: "/fr/parlez_vous_anglais.mp3" }
    ],
    numbers: [
      { text: "Un", audioSrc: "/fr/un.mp3" },
      { text: "Deux", audioSrc: "/fr/deux.mp3" },
      { text: "Trois", audioSrc: "/fr/trois.mp3" },
      { text: "Quatre", audioSrc: "/fr/quatre.mp3" },
      { text: "Cinq", audioSrc: "/fr/cinq.mp3" },
      { text: "Six", audioSrc: "/fr/six.mp3" },
      { text: "Sept", audioSrc: "/fr/sept.mp3" },
      { text: "Huit", audioSrc: "/fr/huit.mp3" },
      { text: "Neuf", audioSrc: "/fr/neuf.mp3" },
      { text: "Dix", audioSrc: "/fr/dix.mp3" }
    ],
    colors: [
      { text: "Rouge", audioSrc: "/fr/rouge.mp3" },
      { text: "Bleu", audioSrc: "/fr/bleu.mp3" },
      { text: "Vert", audioSrc: "/fr/vert.mp3" },
      { text: "Jaune", audioSrc: "/fr/jaune.mp3" },
      { text: "Noir", audioSrc: "/fr/noir.mp3" },
      { text: "Blanc", audioSrc: "/fr/blanc.mp3" },
      { text: "Orange", audioSrc: "/fr/orange.mp3" },
      { text: "Violet", audioSrc: "/fr/violet.mp3" }
    ],
    family: [
      { text: "Mère", audioSrc: "/fr/mere.mp3" },
      { text: "Père", audioSrc: "/fr/pere.mp3" },
      { text: "Frère", audioSrc: "/fr/frere.mp3" },
      { text: "Sœur", audioSrc: "/fr/soeur.mp3" },
      { text: "Fils", audioSrc: "/fr/fils.mp3" },
      { text: "Fille", audioSrc: "/fr/fille.mp3" },
      { text: "Famille", audioSrc: "/fr/famille.mp3" },
      { text: "Parents", audioSrc: "/fr/parents.mp3" }
    ],
    animals: [
      { text: "Chien", audioSrc: "/fr/chien.mp3" },
      { text: "Chat", audioSrc: "/fr/chat.mp3" },
      { text: "Oiseau", audioSrc: "/fr/oiseau.mp3" },
      { text: "Poisson", audioSrc: "/fr/poisson.mp3" },
      { text: "Cheval", audioSrc: "/fr/cheval.mp3" },
      { text: "Vache", audioSrc: "/fr/vache.mp3" },
      { text: "Poulet", audioSrc: "/fr/poulet.mp3" },
      { text: "Lapin", audioSrc: "/fr/lapin.mp3" }
    ],
    food: [
      { text: "Eau", audioSrc: "/fr/eau.mp3" },
      { text: "Pain", audioSrc: "/fr/pain.mp3" },
      { text: "Fromage", audioSrc: "/fr/fromage.mp3" },
      { text: "Pomme", audioSrc: "/fr/pomme.mp3" },
      { text: "Banane", audioSrc: "/fr/banane.mp3" },
      { text: "Café", audioSrc: "/fr/cafe.mp3" },
      { text: "Thé", audioSrc: "/fr/the.mp3" },
      { text: "Lait", audioSrc: "/fr/lait.mp3" }
    ],
    places: [
      { text: "École", audioSrc: "/fr/ecole.mp3" },
      { text: "Hôpital", audioSrc: "/fr/hopital.mp3" },
      { text: "Restaurant", audioSrc: "/fr/restaurant.mp3" },
      { text: "Parc", audioSrc: "/fr/parc.mp3" },
      { text: "Magasin", audioSrc: "/fr/magasin.mp3" },
      { text: "Banque", audioSrc: "/fr/banque.mp3" },
      { text: "Hôtel", audioSrc: "/fr/hotel.mp3" }
    ],
    transportation: [
      { text: "Voiture", audioSrc: "/fr/voiture.mp3" },
      { text: "Bus", audioSrc: "/fr/bus.mp3" },
      { text: "Train", audioSrc: "/fr/train.mp3" },
      { text: "Vélo", audioSrc: "/fr/velo.mp3" },
      { text: "Avion", audioSrc: "/fr/avion.mp3" },
      { text: "Gare", audioSrc: "/fr/gare.mp3" },
      { text: "Billet", audioSrc: "/fr/billet.mp3" }
    ],
    clothing: [
      { text: "Chemise", audioSrc: "/fr/chemise.mp3" },
      { text: "Pantalon", audioSrc: "/fr/pantalon.mp3" },
      { text: "Chaussures", audioSrc: "/fr/chaussures.mp3" },
      { text: "Chapeau", audioSrc: "/fr/chapeau.mp3" },
      { text: "Robe", audioSrc: "/fr/robe.mp3" },
      { text: "Veste", audioSrc: "/fr/veste.mp3" },
      { text: "Chaussettes", audioSrc: "/fr/chaussettes.mp3" }
    ]
  },
  German: {
    basics: [
      { text: "Hallo", audioSrc: "/de/hallo.mp3" },
      { text: "Auf Wiedersehen", audioSrc: "/de/auf_wiedersehen.mp3" },
      { text: "Bitte", audioSrc: "/de/bitte.mp3" },
      { text: "Danke", audioSrc: "/de/danke.mp3" },
      { text: "Entschuldigung", audioSrc: "/de/entschuldigung.mp3" },
      { text: "Verzeihung", audioSrc: "/de/verzeihung.mp3" }
    ],
    phrases: [
      { text: "Wie geht es dir?", audioSrc: "/de/wie_geht_es_dir.mp3" },
      { text: "Wie heißt du?", audioSrc: "/de/wie_heisst_du.mp3" },
      { text: "Ich heiße...", audioSrc: "/de/ich_heisse.mp3" },
      { text: "Ich verstehe nicht", audioSrc: "/de/ich_verstehe_nicht.mp3" },
      { text: "Sprechen Sie Englisch?", audioSrc: "/de/sprechen_sie_englisch.mp3" }
    ],
    numbers: [
      { text: "Eins", audioSrc: "/de/eins.mp3" },
      { text: "Zwei", audioSrc: "/de/zwei.mp3" },
      { text: "Drei", audioSrc: "/de/drei.mp3" },
      { text: "Vier", audioSrc: "/de/vier.mp3" },
      { text: "Fünf", audioSrc: "/de/fuenf.mp3" },
      { text: "Sechs", audioSrc: "/de/sechs.mp3" },
      { text: "Sieben", audioSrc: "/de/sieben.mp3" },
      { text: "Acht", audioSrc: "/de/acht.mp3" },
      { text: "Neun", audioSrc: "/de/neun.mp3" },
      { text: "Zehn", audioSrc: "/de/zehn.mp3" }
    ],
    colors: [
      { text: "Rot", audioSrc: "/de/rot.mp3" },
      { text: "Blau", audioSrc: "/de/blau.mp3" },
      { text: "Grün", audioSrc: "/de/gruen.mp3" },
      { text: "Gelb", audioSrc: "/de/gelb.mp3" },
      { text: "Schwarz", audioSrc: "/de/schwarz.mp3" },
      { text: "Weiß", audioSrc: "/de/weiss.mp3" },
      { text: "Orange", audioSrc: "/de/orange.mp3" },
      { text: "Lila", audioSrc: "/de/lila.mp3" }
    ],
    family: [
      { text: "Mutter", audioSrc: "/de/mutter.mp3" },
      { text: "Vater", audioSrc: "/de/vater.mp3" },
      { text: "Bruder", audioSrc: "/de/bruder.mp3" },
      { text: "Schwester", audioSrc: "/de/schwester.mp3" },
      { text: "Sohn", audioSrc: "/de/sohn.mp3" },
      { text: "Tochter", audioSrc: "/de/tochter.mp3" },
      { text: "Familie", audioSrc: "/de/familie.mp3" },
      { text: "Eltern", audioSrc: "/de/eltern.mp3" }
    ],
    animals: [
      { text: "Hund", audioSrc: "/de/hund.mp3" },
      { text: "Katze", audioSrc: "/de/katze.mp3" },
      { text: "Vogel", audioSrc: "/de/vogel.mp3" },
      { text: "Fisch", audioSrc: "/de/fisch.mp3" },
      { text: "Pferd", audioSrc: "/de/pferd.mp3" },
      { text: "Kuh", audioSrc: "/de/kuh.mp3" },
      { text: "Huhn", audioSrc: "/de/huhn.mp3" },
      { text: "Hase", audioSrc: "/de/hase.mp3" }
    ],
    food: [
      { text: "Wasser", audioSrc: "/de/wasser.mp3" },
      { text: "Brot", audioSrc: "/de/brot.mp3" },
      { text: "Käse", audioSrc: "/de/kaese.mp3" },
      { text: "Apfel", audioSrc: "/de/apfel.mp3" },
      { text: "Banane", audioSrc: "/de/banane.mp3" },
      { text: "Kaffee", audioSrc: "/de/kaffee.mp3" },
      { text: "Tee", audioSrc: "/de/tee.mp3" },
      { text: "Milch", audioSrc: "/de/milch.mp3" }
    ],
    places: [
      { text: "Schule", audioSrc: "/de/schule.mp3" },
      { text: "Krankenhaus", audioSrc: "/de/krankenhaus.mp3" },
      { text: "Restaurant", audioSrc: "/de/restaurant.mp3" },
      { text: "Park", audioSrc: "/de/park.mp3" },
      { text: "Geschäft", audioSrc: "/de/geschaft.mp3" },
      { text: "Bank", audioSrc: "/de/bank.mp3" },
      { text: "Hotel", audioSrc: "/de/hotel.mp3" }
    ],
    transportation: [
      { text: "Auto", audioSrc: "/de/auto.mp3" },
      { text: "Bus", audioSrc: "/de/bus.mp3" },
      { text: "Zug", audioSrc: "/de/zug.mp3" },
      { text: "Fahrrad", audioSrc: "/de/fahrrad.mp3" },
      { text: "Flugzeug", audioSrc: "/de/flugzeug.mp3" },
      { text: "Bahnhof", audioSrc: "/de/bahnhof.mp3" },
      { text: "Fahrkarte", audioSrc: "/de/fahrkarte.mp3" }
    ],
    clothing: [
      { text: "Hemd", audioSrc: "/de/hemd.mp3" },
      { text: "Hose", audioSrc: "/de/hose.mp3" },
      { text: "Schuhe", audioSrc: "/de/schuhe.mp3" },
      { text: "Hut", audioSrc: "/de/hut.mp3" },
      { text: "Kleid", audioSrc: "/de/kleid.mp3" },
      { text: "Jacke", audioSrc: "/de/jacke.mp3" },
      { text: "Socken", audioSrc: "/de/socken.mp3" }
    ]
  },
  Italian: {
    basics: [
      { text: "Ciao", audioSrc: "/it/ciao.mp3" },
      { text: "Arrivederci", audioSrc: "/it/arrivederci.mp3" },
      { text: "Per favore", audioSrc: "/it/per_favore.mp3" },
      { text: "Grazie", audioSrc: "/it/grazie.mp3" },
      { text: "Scusa", audioSrc: "/it/scusa.mp3" },
      { text: "Mi scusi", audioSrc: "/it/mi_scusi.mp3" }
    ],
    phrases: [
      { text: "Come stai?", audioSrc: "/it/come_stai.mp3" },
      { text: "Come ti chiami?", audioSrc: "/it/come_ti_chiami.mp3" },
      { text: "Mi chiamo...", audioSrc: "/it/mi_chiamo.mp3" },
      { text: "Non capisco", audioSrc: "/it/non_capisco.mp3" },
      { text: "Parli inglese?", audioSrc: "/it/parli_inglese.mp3" }
    ],
    numbers: [
      { text: "Uno", audioSrc: "/it/uno.mp3" },
      { text: "Due", audioSrc: "/it/due.mp3" },
      { text: "Tre", audioSrc: "/it/tre.mp3" },
      { text: "Quattro", audioSrc: "/it/quattro.mp3" },
      { text: "Cinque", audioSrc: "/it/cinque.mp3" },
      { text: "Sei", audioSrc: "/it/sei.mp3" },
      { text: "Sette", audioSrc: "/it/sette.mp3" },
      { text: "Otto", audioSrc: "/it/otto.mp3" },
      { text: "Nove", audioSrc: "/it/nove.mp3" },
      { text: "Dieci", audioSrc: "/it/dieci.mp3" }
    ],
    colors: [
      { text: "Rosso", audioSrc: "/it/rosso.mp3" },
      { text: "Blu", audioSrc: "/it/blu.mp3" },
      { text: "Verde", audioSrc: "/it/verde.mp3" },
      { text: "Giallo", audioSrc: "/it/giallo.mp3" },
      { text: "Nero", audioSrc: "/it/nero.mp3" },
      { text: "Bianco", audioSrc: "/it/bianco.mp3" },
      { text: "Arancione", audioSrc: "/it/arancione.mp3" },
      { text: "Viola", audioSrc: "/it/viola.mp3" }
    ],
    family: [
      { text: "Madre", audioSrc: "/it/madre.mp3" },
      { text: "Padre", audioSrc: "/it/padre.mp3" },
      { text: "Fratello", audioSrc: "/it/fratello.mp3" },
      { text: "Sorella", audioSrc: "/it/sorella.mp3" },
      { text: "Figlio", audioSrc: "/it/figlio.mp3" },
      { text: "Figlia", audioSrc: "/it/figlia.mp3" },
      { text: "Famiglia", audioSrc: "/it/famiglia.mp3" },
      { text: "Genitori", audioSrc: "/it/genitori.mp3" }
    ],
    animals: [
      { text: "Cane", audioSrc: "/it/cane.mp3" },
      { text: "Gatto", audioSrc: "/it/gatto.mp3" },
      { text: "Uccello", audioSrc: "/it/uccello.mp3" },
      { text: "Pesce", audioSrc: "/it/pesce.mp3" },
      { text: "Cavallo", audioSrc: "/it/cavallo.mp3" },
      { text: "Mucca", audioSrc: "/it/mucca.mp3" },
      { text: "Pollo", audioSrc: "/it/pollo.mp3" },
      { text: "Coniglio", audioSrc: "/it/coniglio.mp3" }
    ],
    food: [
      { text: "Acqua", audioSrc: "/it/acqua.mp3" },
      { text: "Pane", audioSrc: "/it/pane.mp3" },
      { text: "Formaggio", audioSrc: "/it/formaggio.mp3" },
      { text: "Mela", audioSrc: "/it/mela.mp3" },
      { text: "Banana", audioSrc: "/it/banana.mp3" },
      { text: "Caffè", audioSrc: "/it/caffe.mp3" },
      { text: "Tè", audioSrc: "/it/te.mp3" },
      { text: "Latte", audioSrc: "/it/latte.mp3" }
    ],
    places: [
      { text: "Scuola", audioSrc: "/it/scuola.mp3" },
      { text: "Ospedale", audioSrc: "/it/ospedale.mp3" },
      { text: "Ristorante", audioSrc: "/it/ristorante.mp3" },
      { text: "Parco", audioSrc: "/it/parco.mp3" },
      { text: "Negozio", audioSrc: "/it/negozio.mp3" },
      { text: "Banca", audioSrc: "/it/banca.mp3" },
      { text: "Hotel", audioSrc: "/it/hotel.mp3" }
    ],
    transportation: [
      { text: "Macchina", audioSrc: "/it/macchina.mp3" },
      { text: "Autobus", audioSrc: "/it/autobus.mp3" },
      { text: "Treno", audioSrc: "/it/treno.mp3" },
      { text: "Bicicletta", audioSrc: "/it/bicicletta.mp3" },
      { text: "Aereo", audioSrc: "/it/aereo.mp3" },
      { text: "Stazione", audioSrc: "/it/stazione.mp3" },
      { text: "Biglietto", audioSrc: "/it/biglietto.mp3" }
    ],
    clothing: [
      { text: "Camicia", audioSrc: "/it/camicia.mp3" },
      { text: "Pantaloni", audioSrc: "/it/pantaloni.mp3" },
      { text: "Scarpe", audioSrc: "/it/scarpe.mp3" },
      { text: "Cappello", audioSrc: "/it/cappello.mp3" },
      { text: "Vestito", audioSrc: "/it/vestito.mp3" },
      { text: "Giacca", audioSrc: "/it/giacca.mp3" },
      { text: "Calzini", audioSrc: "/it/calzini.mp3" }
    ]
  }
};

async function generateAudio(
  text: string, 
  voiceId: string, 
  outputPath: string
): Promise<void> {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, response.data);
    console.log(`✓ Generated: ${outputPath}`);
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.error(`✗ Authentication failed. Check your API key.`);
      process.exit(1);
    } else if (error.response?.status === 429) {
      console.error(`✗ Rate limit exceeded. Waiting 5 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      // Retry once
      return generateAudio(text, voiceId, outputPath);
    } else {
      console.error(`✗ Failed to generate ${outputPath}:`, error.message);
    }
  }
}

async function generateAllAudio(): Promise<void> {
  console.log('🎙️  Starting ElevenLabs audio generation...\n');
  console.log('⚠️  Note: This will use your ElevenLabs character quota');
  console.log('⚠️  Free tier: 10,000 characters/month');
  console.log('⚠️  Estimated characters for this project: ~3,500\n');
  
  const startTime = Date.now();
  let totalGenerated = 0;
  let totalSkipped = 0;
  let totalCharacters = 0;
  
  for (const [language, content] of Object.entries(LANGUAGE_CONTENT)) {
    const config = languageConfig[language as keyof typeof languageConfig];
    
    if (!config) {
      console.log(`⚠️  No configuration for ${language}, skipping...`);
      continue;
    }
    
    console.log(`\n📢 Generating audio for ${language}...`);
    
    const categories = [
      'basics', 'phrases', 'numbers', 'colors', 
      'family', 'animals', 'food', 'places', 
      'transportation', 'clothing'
    ];
    
    for (const category of categories) {
      if (content[category]) {
        console.log(`  📁 Category: ${category}`);
        
        for (const item of content[category]) {
          const audioPath = path.join(process.cwd(), 'public', item.audioSrc);
          
          // Skip if already exists
          if (fs.existsSync(audioPath)) {
            console.log(`    ⏭️  Skipping existing: ${path.basename(audioPath)}`);
            totalSkipped++;
            continue;
          }
          
          await generateAudio(item.text, config.voiceId, audioPath);
          totalGenerated++;
          totalCharacters += item.text.length;
          
          // Rate limiting - wait 1 second between requests to avoid hitting rate limits
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000 / 60).toFixed(2);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Audio generation complete!');
  console.log('='.repeat(60));
  console.log(`📊 Generated: ${totalGenerated} files`);
  console.log(`⏭️  Skipped: ${totalSkipped} existing files`);
  console.log(`📝 Total characters used: ${totalCharacters}`);
  console.log(`⏱️  Time taken: ${duration} minutes`);
  console.log('='.repeat(60));
  console.log('\n💡 Next steps:');
  console.log('   1. Verify all audio files are in public/[language]/ folders');
  console.log('   2. Test audio playback in your application');
  console.log('   3. Commit audio files to git: git add public/*/');
  console.log('   4. Delete this script: rm scripts/generate-audio.ts');
  console.log('\n🎉 Your Duolingo clone now has professional audio!');
}

// Run the generator
generateAllAudio().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});