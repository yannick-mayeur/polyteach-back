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
    "idCourse" integer NOT NULL,
    "nameCourse" text,
    "pictureCourse" text,
    "descriptionCourse" text,
    "classCourse" class,
    "idteacher-Course" integer,
    "creationDate" date
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

ALTER SEQUENCE "Course_idCourse_seq" OWNED BY course."idCourse";


--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE student (
    "idStudent" integer NOT NULL,
    "emailStudent" text,
    "passwordStudent" text,
    "roleStudent" integer,
    "firstNameStudent" text,
    "lastNameStudent" text,
    "classStudent" class
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

ALTER SEQUENCE "Student_idUser_seq" OWNED BY student."idStudent";


--
-- Name: teacher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE teacher (
    "idTeacher" integer NOT NULL,
    "emailTeacher" text,
    "passwordTeacher" text,
    "roleTeacher" integer,
    "firstNameTeacher" text,
    "lastNameTeacher" text
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

ALTER SEQUENCE "Teacher_idTeacher_seq" OWNED BY teacher."idTeacher";


--
-- Name: video; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE video (
    "idVideo" integer NOT NULL,
    "idChapter-Video" integer,
    "titleVideo" text,
    "hashDrive" text,
    "hashServer" text,
    "hashVtt" text,
    "expiryData" date
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

ALTER SEQUENCE "Video_idVideo_seq" OWNED BY video."idVideo";


--
-- Name: possescourse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE possescourse (
    "userId-PossesCourse" integer,
    "courseId-PossesCourse" integer,
    bookmarked boolean
);


ALTER TABLE possescourse OWNER TO postgres;

--
-- Name: ratingcourse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ratingcourse (
    "idUser-RatingCourse" integer,
    "idCourse-RatingCourse" integer,
    "value-RatingCourse" integer
);


ALTER TABLE ratingcourse OWNER TO postgres;

--
-- Name: ratingvideo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ratingvideo (
    "idUser-RatingVideo" integer,
    "idVideo-RatingVideo" integer,
    "value-RatingVideo" integer
);


ALTER TABLE ratingvideo OWNER TO postgres;

--
-- Name: see; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE see (
    "idUser-See" integer,
    "idCourse-See" integer,
    advancement timestamp without time zone
);


ALTER TABLE see OWNER TO postgres;

--
-- Name: course idCourse; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course ALTER COLUMN "idCourse" SET DEFAULT nextval('"Course_idCourse_seq"'::regclass);


--
-- Name: student idStudent; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY student ALTER COLUMN "idStudent" SET DEFAULT nextval('"Student_idUser_seq"'::regclass);


--
-- Name: teacher idTeacher; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY teacher ALTER COLUMN "idTeacher" SET DEFAULT nextval('"Teacher_idTeacher_seq"'::regclass);


--
-- Name: video idVideo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY video ALTER COLUMN "idVideo" SET DEFAULT nextval('"Video_idVideo_seq"'::regclass);


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY course ("idCourse", "nameCourse", "pictureCourse", "descriptionCourse", "classCourse", "idteacher-Course", "creationDate") FROM stdin;
3	DevOps	https://static1.squarespace.com/static/559dc415e4b0fcb781ceca92/55b6c5f7e4b08c3f4b9f3f83/5c51551e4ae23755fa90f088/1548890390219/jason-leung-479251-unsplash.jpg?format=2500w	description 3	IG4	\N	\N
1	AWI	https://img.buzzfeed.com/buzzfeed-static/static/campaign_images/webdr06/2013/7/11/12/35-random-corners-of-the-internet-you-should-visi-1-10632-1373560090-0_big.jpg	description	IG5	\N	\N
2	WI	https://dyw7ncnq1en5l.cloudfront.net/optim/produits/450/49565/huawei-matebook-13_48d03b2c431078f0__450_400.jpg	description 2	IG3	\N	\N
\.


--
-- Data for Name: possescourse; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY possescourse ("userId-PossesCourse", "courseId-PossesCourse", bookmarked) FROM stdin;
\.


--
-- Data for Name: ratingcourse; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ratingcourse ("idUser-RatingCourse", "idCourse-RatingCourse", "value-RatingCourse") FROM stdin;
\.


--
-- Data for Name: ratingvideo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ratingvideo ("idUser-RatingVideo", "idVideo-RatingVideo", "value-RatingVideo") FROM stdin;
\.


--
-- Data for Name: see; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY see ("idUser-See", "idCourse-See", advancement) FROM stdin;
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY student ("idStudent", "emailStudent", "passwordStudent", "roleStudent", "firstNameStudent", "lastNameStudent", "classStudent") FROM stdin;
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY teacher ("idTeacher", "emailTeacher", "passwordTeacher", "roleTeacher", "firstNameTeacher", "lastNameTeacher") FROM stdin;
\.


--
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY video ("idVideo", "idChapter-Video", "titleVideo", "hashDrive", "hashServer", "hashVtt", "expiryData") FROM stdin;
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
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("idCourse");


--
-- Name: student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY student
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("idStudent");


--
-- Name: teacher Teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY teacher
    ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("idTeacher");


--
-- Name: video Video_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY video
    ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("idVideo");


--
-- PostgreSQL database dump complete
--
