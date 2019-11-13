--
-- PostgreSQL database dump
--

-- Dumped from database version 10.2 (Debian 10.2-1.pgdg90+1)
-- Dumped by pg_dump version 10.2 (Debian 10.2-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

$ pg_dump polyteach-db
pg_dump: [archiver (db)] connection to database "polyteach-db" failed: FATAL:  database "polyteach-db" does not exist
$ pg_dump polyteach-db
pg_dump: [archiver (db)] connection to database "polyteach-db" failed: FATAL:  database "polyteach-db" does not exist
$ pg_dump polyteach_db
--
-- PostgreSQL database dump
--

-- Dumped from database version 10.2 (Debian 10.2-1.pgdg90+1)
-- Dumped by pg_dump version 10.2 (Debian 10.2-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: main; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA main;


ALTER SCHEMA main OWNER TO postgres;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: class; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE class AS ENUM (
    'IG3',
    'IG4',
    'IG5'
);


ALTER TYPE class OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE course (
    idcourse integer NOT NULL,
    namecourse text,
    picturecourse text,
    descriptioncourse text,
    classcourse class,
    "idteacher-course" integer,
    creationdate date
);


ALTER TABLE course OWNER TO postgres;

--
-- Name: Course_idCourse_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Course_idCourse_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Course_idCourse_seq" OWNER TO postgres;

--
-- Name: Course_idCourse_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Course_idCourse_seq" OWNED BY course.idcourse;


--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE student (
    idstudent integer NOT NULL,
    emailstudent text,
    passwordstudent text,
    rolestudent integer,
    firstnamestudent text,
    lastnamestudent text,
    "class-student" class
);


ALTER TABLE student OWNER TO postgres;

--
-- Name: Student_idUser_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Student_idUser_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Student_idUser_seq" OWNER TO postgres;

--
-- Name: Student_idUser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Student_idUser_seq" OWNED BY student.idstudent;


--
-- Name: teacher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE teacher (
    idteacher integer NOT NULL,
    emailteacher text,
    passwordteacher text,
    roleteacher integer,
    firstnameteacher text,
    lastnameteacher text
);


ALTER TABLE teacher OWNER TO postgres;

--
-- Name: Teacher_idTeacher_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Teacher_idTeacher_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Teacher_idTeacher_seq" OWNER TO postgres;

--
-- Name: Teacher_idTeacher_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Teacher_idTeacher_seq" OWNED BY teacher.idteacher;


--
-- Name: video; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE video (
    idvideo integer NOT NULL,
    "idchapter-video" integer,
    titlevideo text,
    hashdrive text,
    hashserver text,
    hashvtt text,
    expirydata date
);


ALTER TABLE video OWNER TO postgres;

--
-- Name: Video_idVideo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Video_idVideo_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Video_idVideo_seq" OWNER TO postgres;

--
-- Name: Video_idVideo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Video_idVideo_seq" OWNED BY video.idvideo;


--
-- Name: create; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "create" (
    "iduser-create" integer,
    "idcourse-create" integer,
    datecreation date
);


ALTER TABLE "create" OWNER TO postgres;

--
-- Name: possescourse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE possescourse (
    "userid-possescourse" integer,
    "courseid-possescourse" integer,
    bookmarked boolean
);


ALTER TABLE possescourse OWNER TO postgres;

--
-- Name: ratingcourse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ratingcourse (
    "iduser-ratingcourse" integer,
    "idcourse-ratingcourse" integer,
    "value-ratingcourse" integer
);


ALTER TABLE ratingcourse OWNER TO postgres;

--
-- Name: ratingvideo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ratingvideo (
    "iduser-ratingvideo" integer,
    "idvideo-ratingvideo" integer,
    "value-ratingvideo" integer
);


ALTER TABLE ratingvideo OWNER TO postgres;

--
-- Name: see; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE see (
    "iduser-see" integer,
    "idcourse-see" integer,
    advancement timestamp without time zone
);


ALTER TABLE see OWNER TO postgres;

--
-- Name: course idcourse; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course ALTER COLUMN idcourse SET DEFAULT nextval('"Course_idCourse_seq"'::regclass);


--
-- Name: student idstudent; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY student ALTER COLUMN idstudent SET DEFAULT nextval('"Student_idUser_seq"'::regclass);


--
-- Name: teacher idteacher; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY teacher ALTER COLUMN idteacher SET DEFAULT nextval('"Teacher_idTeacher_seq"'::regclass);


--
-- Name: video idvideo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY video ALTER COLUMN idvideo SET DEFAULT nextval('"Video_idVideo_seq"'::regclass);


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY course (idcourse, namecourse, picturecourse, descriptioncourse, classcourse, "idteacher-course", creationdate) FROM stdin;
3	DevOps	https://static1.squarespace.com/static/559dc415e4b0fcb781ceca92/55b6c5f7e4b08c3f4b9f3f83/5c51551e4ae23755fa90f088/1548890390219/jason-leung-479251-unsplash.jpg?format=2500w	description 3	IG4	\N	\N
1	AWI	https://img.buzzfeed.com/buzzfeed-static/static/campaign_images/webdr06/2013/7/11/12/35-random-corners-of-the-internet-you-should-visi-1-10632-1373560090-0_big.jpg	description	IG5	\N	\N
2	WI	https://dyw7ncnq1en5l.cloudfront.net/optim/produits/450/49565/huawei-matebook-13_48d03b2c431078f0__450_400.jpg	description 2	IG3	\N	\N
\.


--
-- Data for Name: create; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "create" ("iduser-create", "idcourse-create", datecreation) FROM stdin;
\.


--
-- Data for Name: possescourse; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY possescourse ("userid-possescourse", "courseid-possescourse", bookmarked) FROM stdin;
\.


--
-- Data for Name: ratingcourse; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ratingcourse ("iduser-ratingcourse", "idcourse-ratingcourse", "value-ratingcourse") FROM stdin;
\.


--
-- Data for Name: ratingvideo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ratingvideo ("iduser-ratingvideo", "idvideo-ratingvideo", "value-ratingvideo") FROM stdin;
\.


--
-- Data for Name: see; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY see ("iduser-see", "idcourse-see", advancement) FROM stdin;
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY student (idstudent, emailstudent, passwordstudent, rolestudent, firstnamestudent, lastnamestudent, "class-student") FROM stdin;
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY teacher (idteacher, emailteacher, passwordteacher, roleteacher, firstnameteacher, lastnameteacher) FROM stdin;
\.


--
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY video (idvideo, "idchapter-video", titlevideo, hashdrive, hashserver, hashvtt, expirydata) FROM stdin;
\.


--
-- Name: Course_idCourse_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Course_idCourse_seq"', 3, true);


--
-- Name: Student_idUser_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Student_idUser_seq"', 1, false);


--
-- Name: Teacher_idTeacher_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Teacher_idTeacher_seq"', 1, false);


--
-- Name: Video_idVideo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Video_idVideo_seq"', 1, false);


--
-- Name: course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (idcourse);


--
-- Name: student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY student
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (idstudent);


--
-- Name: teacher Teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY teacher
    ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY (idteacher);


--
-- Name: video Video_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY video
    ADD CONSTRAINT "Video_pkey" PRIMARY KEY (idvideo);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
