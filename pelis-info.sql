--
-- PostgreSQL database dump
-- pelisinfo.sql

-- Dumped from database version 15.8
-- Dumped by pg_dump version 16.4

-- Started on 2025-04-11 18:11:51

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 41777)
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.genre OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 41770)
-- Name: movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    adult boolean,
    backdrop_path character varying(255),
    original_language character varying(10),
    original_title character varying(255),
    overview text,
    popularity double precision,
    poster_path character varying(255),
    release_date date,
    title character varying(255),
    video boolean,
    vote_average double precision,
    vote_count integer
);


ALTER TABLE public.movie OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 41782)
-- Name: movie_genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_genre (
    movie_id integer NOT NULL,
    genre_id integer NOT NULL
);


ALTER TABLE public.movie_genre OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 41806)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    full_name character varying,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 41805)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_seq OWNER TO postgres;

--
-- TOC entry 3348 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- TOC entry 3185 (class 2604 OID 41809)
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- TOC entry 3339 (class 0 OID 41777)
-- Dependencies: 215
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre (id, name) FROM stdin;
28	Acción
12	Aventura
16	Animación
35	Comedia
80	Crimen
99	Documental
18	Drama
10751	Familia
14	Fantasía
36	Historia
27	Terror
10402	Música
9648	Misterio
10749	Romance
878	Ciencia ficción
10770	Película de TV
53	Suspense
10752	Bélica
37	Western
\.


--
-- TOC entry 3338 (class 0 OID 41770)
-- Dependencies: 214
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie (id, adult, backdrop_path, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count) FROM stdin;
1165067	f	/m2mzlsJjE3UAqeUB5fLUkpWg4Iq.jpg	en	Cosmic Chaos	Batallas en realidad virtual, supervivencia en un páramo postapocalíptico, una nave espacial soviética que emite una señal de socorro... Historias fantásticas creadas con avanzados efectos especiales y pasión.	503.4688	/mClzWv7gBqgXfjZXp49Enyoex1v.jpg	2023-08-03	Relatos Fantásticos	f	3.3	3
1125899	f	/gsQJOfeW45KLiQeEIsom94QPQwb.jpg	en	Cleaner	Cuando un grupo de activistas radicales se apodera de la gala anual de una empresa energética y toma 300 rehenes, una ex soldado convertida en limpiacristales suspendida 50 pisos en el exterior del edificio debe salvar a los que están atrapados dentro, incluido su hermano pequeño.	482.4115	/2KIqFpvjVI6mNBTQw7MYZdzRYvs.jpg	2025-02-19	Cleaner	f	6.7	120
822119	f	/8eifdha9GQeZAkexgtD45546XKx.jpg	en	Captain America: Brave New World	Tras reunirse con el recién elegido presidente de los EE. UU., Thaddeus Ross, Sam se encuentra en medio de un incidente internacional. Debe descubrir el motivo que se esconde tras un perverso complot global, antes de que su verdadero artífice enfurezca al mundo entero.	391.167	/im71UJzBqY03swuGYVR28j0JFM2.jpg	2025-02-12	Capitán América: Brave New World	f	6.084	1157
682666	f	/dxdN3RxJRVYzFxVSR0fNhSBqBSL.jpg	en	Back to the Titanic	Back to the Titanic documenta las primeras inmersiones tripuladas al Titanic en casi 15 años. Nuevas imágenes revelan una nueva descomposición y arrojan luz sobre el futuro del barco.	1.6066	/2t20mlU5nuM664cgBX2lLKg8GGo.jpg	2020-02-23	Regreso al Titanic	f	6.4	15
0	f	/dxdN3RxJRVYzFxVSR0fNhSBqBSL.jpg	en	Back to the Titanic	Back to the Titanic documenta las primeras inmersiones tripuladas al Titanic en casi 15 años. Nuevas imágenes revelan una nueva descomposición y arrojan luz sobre el futuro del barco.	1.6066	/2t20mlU5nuM664cgBX2lLKg8GGo.jpg	2020-02-23	Regreso al Titanic	f	6.4	15
1229730	f	/is9bmV6uYXu7LjZGJczxrjJDlv8.jpg	fr	Carjackers	Por el día, son invisibles: aparcacoches, recepcionistas y camareros de un hotel de lujo. Por la noche, son criminales, una banda de conductores expertos que asalta a clientes ricos en sus coches. Justo cuando planean su último golpe, la directora del hotel contrata a un sicario despiadado para detenerlos. El peligro les acecha, ¿conseguirán Nora, Zoé, Steve y Prestance dar su mayor golpe?	398.2681	/rpAbueORafYSgTk2oSc2t6ayktb.jpg	2025-03-27	Criminales de lujo	f	6.8	21
\.


--
-- TOC entry 3340 (class 0 OID 41782)
-- Dependencies: 216
-- Data for Name: movie_genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_genre (movie_id, genre_id) FROM stdin;
1165067	878
1165067	53
1125899	28
1125899	53
822119	28
822119	878
822119	53
0	99
682666	99
1229730	28
1229730	12
\.


--
-- TOC entry 3342 (class 0 OID 41806)
-- Dependencies: 218
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, full_name, username, email, password, role) FROM stdin;
1	\N	nuevoUsuario	usuario@example.com	$2a$10$tXhx4h9Zxu5VOeHc6Qv.a.opfY3mkLUI1l2yLjZWS00ZIx4ubICda	\N
2	CARLOSDAM	carlosdam	carlosdam@mail.com	$2a$10$8LX6iwvHL0xC6L3y8LK32.FUT9Lj9uuxmMSplJ0yyobum7PgDvy2W	user
3	PEPEDAM	pepedam	pepedam@mail.com	$2a$10$OuTTpQuudHmpZqcWGySHyOAf/Fu278DzUJPPIYaytjxQI7t76azRK	user
4	PEPADAM	pepadam	pepedam@mail.com	$2a$10$2WTdP0lfn9o.9LxWFtp.4OfgMXQlP2V9yO634qC5DmO2qM3yTDgPe	user
5	PRUEBA	prueba	prueba@mail.com	$2a$10$glMmCr1rcj5Ip/ad/98Gge.GOXNDN57jHCyuv2VIC3MAz3IwxlG3K	user
6	USER	user	email1@mail.com	$2a$10$Zvg8pBa8iZ3OnnxNHASsUOdzpfubKQhSrIhGljU4eTjLr.GThUutG	user
7	USER1	user1	prueba@mail.com	$2a$10$W8BD.iBrwyuC9j55Gl/4ZeI2h86JxH7muNhrLtZTGlQZXj/b7dCEy	user
\.


--
-- TOC entry 3349 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 7, true);


--
-- TOC entry 3189 (class 2606 OID 41781)
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- TOC entry 3191 (class 2606 OID 41786)
-- Name: movie_genre movie_genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genre
    ADD CONSTRAINT movie_genre_pkey PRIMARY KEY (movie_id, genre_id);


--
-- TOC entry 3187 (class 2606 OID 41776)
-- Name: movie movie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);


--
-- TOC entry 3193 (class 2606 OID 41813)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 3194 (class 2606 OID 41792)
-- Name: movie_genre movie_genre_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genre
    ADD CONSTRAINT movie_genre_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genre(id) ON DELETE CASCADE;


--
-- TOC entry 3195 (class 2606 OID 41787)
-- Name: movie_genre movie_genre_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genre
    ADD CONSTRAINT movie_genre_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movie(id) ON DELETE CASCADE;


-- Completed on 2025-04-11 18:11:51

--
-- PostgreSQL database dump complete
--

