--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token character varying(256) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_DATE
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url character varying(256) NOT NULL,
    shorturl character varying(256) NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_DATE NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: userUrls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."userUrls" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "urlId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_DATE
);


--
-- Name: userUrls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."userUrls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: userUrls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."userUrls_id_seq" OWNED BY public."userUrls".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(256) NOT NULL,
    email character varying(256) NOT NULL,
    password character varying(256) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_DATE NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: userUrls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userUrls" ALTER COLUMN id SET DEFAULT nextval('public."userUrls_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 3, 'ea5e4405-02dc-44ba-b7ce-afd5d2268d9e', '2023-08-07 00:00:00');
INSERT INTO public.sessions VALUES (2, 4, '3ece83bf-a634-49d0-9613-dd3cbc171e15', '2023-08-07 00:00:00');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 2, 'bren', 'brena', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (4, 2, 'brene', 'brenae', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (6, 2, 'brenew', 'brenaed', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (7, 2, 'brenew', 'brenaesd', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (8, 2, 'brenew', 'brenaesx', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (9, 2, 'brenew', 'brenaesz', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (10, 2, 'brenew', 'brenaezz', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (11, 2, 'brenew', 'brfnaezz', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (13, 1, 'brenew', 'brfnaedz', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (14, 2, 'brenew', 'brenaezA', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (15, 2, 'brenew', 'brenaezB', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (16, 2, 'brenew', 'brenaezC', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (17, 1, 'brenew', 'brenaezD', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (18, 1, 'brenew', 'brenaezE', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (19, 1, 'brenew', 'brenaezF', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (20, 2, 'brenew', 'brenaezG', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (21, 2, 'brenew', 'brenaezH', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (22, 1, 'brenew', 'brenaezI', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (23, 3, 'https://chat.openai.com/', '02NzamJL', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (24, 3, 'https://chat.openai.com/', 'ZPY0iEgr', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (25, 3, 'https://chat.openai.com/', 'LnOllOsr', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (26, 3, 'https://chat.openai.com/', 'pHh-hjX4', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (27, 3, 'https://chat.openai.com/', 'ru_r0oVZ', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (28, 3, 'https://chat.openai.com/', '1bh-K2tA', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (29, 3, 'https://chat.openai.com/', 'TjNpcNvP', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (30, 3, 'https://chat.openai.com/', 'Zfx1Adrl', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (31, 3, 'https://chat.openai.com/', 'lhvh-FoG', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (32, 3, 'https://chat.openai.com/', 'rhNHfEEv', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (33, 3, 'https://chat.openai.com/', 'AwQQMBtj', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (34, 3, 'https://chat.openai.com/', '7hIZ__6x', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (35, 3, 'https://chat.openai.com/', 'EpfdrwKi', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (36, 3, 'https://chat.openai.com/', 'LUGhhidS', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (37, 3, 'https://chat.openai.com/', 'zcSFglFh', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (38, 3, 'https://chat.openai.com/', 'arIlyEEp', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (39, 3, 'https://chat.openai.com/', 'ue-L5hBR', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (40, 3, 'https://chat.openai.com/', '5wozez_K', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (41, 3, 'https://chat.openai.com/', 'bkc4pW4q', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (42, 3, 'https://chat.openai.com/', 'X8nivEy4', 0, '2023-08-06 00:00:00');
INSERT INTO public.urls VALUES (44, 4, 'https://github.com/Brenenho/projeto17-shortly', 'AW1hjoqS', 1, '2023-08-07 00:00:00');


--
-- Data for Name: userUrls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."userUrls" VALUES (1, 3, 39, '2023-08-07 00:00:00');
INSERT INTO public."userUrls" VALUES (2, 3, 40, '2023-08-07 00:00:00');
INSERT INTO public."userUrls" VALUES (3, 3, 41, '2023-08-07 00:00:00');
INSERT INTO public."userUrls" VALUES (4, 3, 42, '2023-08-07 00:00:00');
INSERT INTO public."userUrls" VALUES (5, 4, 43, '2023-08-07 00:00:00');
INSERT INTO public."userUrls" VALUES (6, 4, 44, '2023-08-07 00:00:00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'brene', 'breno@gmail.com', 'bg123', '2023-08-06 00:00:00');
INSERT INTO public.users VALUES (2, 'bre', 'bren@gmail.com', '123456', '2023-08-06 00:00:00');
INSERT INTO public.users VALUES (3, 'brenen', 'brenohenryck@gmail.com', '$2b$10$JZzrstWm.leaqs5N4Y6tr.J8gX248/.3mVChKBkw3453vMOE1qryi', '2023-08-06 00:00:00');
INSERT INTO public.users VALUES (4, 'Brenenho', 'breno1@gmail.com', '$2b$10$HwTX5jq32NcDVDAZi.6puu4XHbOnZ82Ka9Lk4sUPfDDKE1umwwJ3u', '2023-08-07 00:00:00');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 44, true);


--
-- Name: userUrls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."userUrls_id_seq"', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: sessions sessions_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_key UNIQUE (user_id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shorturl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_shorturl_key UNIQUE (shorturl);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

