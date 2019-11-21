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
    "idteacher-course" integer,
    creationdate date,
    isig3selected boolean,
    isig4selected boolean,
    isig5selected boolean
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
    "idcourse-video" integer,
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
-- Name: live; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE live (
    idsession text NOT NULL,
    namesession text,
    nameteacher text,
    descriptionlive text,
    timestartlive text,
    timestoplive text,
    "idcourse-live" integer
);


ALTER TABLE live OWNER TO postgres;

--
-- Name: possescourse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE possescourse (
    "iduser-possescourse" integer,
    "idcourse-possescourse" integer,
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
    "idvideo-see" integer,
    advancement integer
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

COPY course (idcourse, namecourse, picturecourse, descriptioncourse, "idteacher-course", creationdate, isig3selected, isig4selected, isig5selected) FROM stdin;
3	DevOps	https://static1.squarespace.com/static/559dc415e4b0fcb781ceca92/55b6c5f7e4b08c3f4b9f3f83/5c51551e4ae23755fa90f088/1548890390219/jason-leung-479251-unsplash.jpg?format=2500w	description 3	1	\N	\N	\N	\N
1	AWI	https://img.buzzfeed.com/buzzfeed-static/static/campaign_images/webdr06/2013/7/11/12/35-random-corners-of-the-internet-you-should-visi-1-10632-1373560090-0_big.jpg	description	1	\N	\N	\N	\N
2	WI	https://dyw7ncnq1en5l.cloudfront.net/optim/produits/450/49565/huawei-matebook-13_48d03b2c431078f0__450_400.jpg	description 21\N	\N	\N	\N
\.


--
-- Data for Name: live; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY live (idsession, namesession, nameteacher, descriptionlive, timestartlive, timestoplive, "idcourse-live") FROM stdin;
\.


--
-- Data for Name: possescourse; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY possescourse ("iduser-possescourse", "idcourse-possescourse", bookmarked) FROM stdin;
1	1	f
1	3	t
\.


--
-- Data for Name: ratingcourse; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ratingcourse ("iduser-ratingcourse", "idcourse-ratingcourse", "value-ratingcourse") FROM stdin;
1	1	7
\.


--
-- Data for Name: ratingvideo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ratingvideo ("iduser-ratingvideo", "idvideo-ratingvideo", "value-ratingvideo") FROM stdin;
1	1	2
\.


--
-- Data for Name: see; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY see ("iduser-see", "idvideo-see", advancement) FROM stdin;
1	8	0
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY student (idstudent, emailstudent, passwordstudent, rolestudent, firstnamestudent, lastnamestudent, "class-student") FROM stdin;
1	mamak@etu.umontpellier.fr	password	0	Mamak	Babak	IG5
2	nathan.traineau@etu.umontpellier.fr	$2b$10$RxK28Np9KV1J/XWzLNNTAOQg0jidq12QmBuC8cMafk35JMesMmnKG	0	\N	\N	\N
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY teacher (idteacher, emailteacher, passwordteacher, roleteacher, firstnameteacher, lastnameteacher) FROM stdin;
1	marty.maillet@umontpellier.fr	azertyui	\N	Marty	Maillet
\.


--
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY video (idvideo, "idcourse-video", titlevideo, hashdrive, hashserver, hashvtt, expirydata) FROM stdin;
1	3	\N	\N	\N	\N	\N
2	3	une super vidéo	\N	\N	\N	\N
\.


--
-- Name: Course_idCourse_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Course_idCourse_seq"', 3, true);


--
-- Name: Student_idUser_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Student_idUser_seq"', 2, true);


--
-- Name: Teacher_idTeacher_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Teacher_idTeacher_seq"', 1, true);


--
-- Name: Video_idVideo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"Video_idVideo_seq"', 1, true);


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
-- Name: live live_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY live
    ADD CONSTRAINT live_pkey PRIMARY KEY (idsession);


--
-- Name: fki_fk_; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_ ON ratingvideo USING btree ("iduser-ratingvideo");


--
-- Name: fki_fk_course_idteacher; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_course_idteacher ON course USING btree ("idteacher-course");


--
-- Name: fki_fk_live_idcourse; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_live_idcourse ON live USING btree ("idcourse-live");


--
-- Name: fki_fk_possesscourse_idcourse; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_possesscourse_idcourse ON possescourse USING btree ("idcourse-possescourse");


--
-- Name: fki_fk_possesscourse_iduser; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_possesscourse_iduser ON possescourse USING btree ("iduser-possescourse");


--
-- Name: fki_fk_ratingcourse_idcourse; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_ratingcourse_idcourse ON ratingcourse USING btree ("idcourse-ratingcourse");


--
-- Name: fki_fk_ratingvideo_idvideo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_ratingvideo_idvideo ON ratingvideo USING btree ("idvideo-ratingvideo");


--
-- Name: fki_fk_see_iduser; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_see_iduser ON see USING btree ("iduser-see");


--
-- Name: fki_fk_see_idvideo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_see_idvideo ON see USING btree ("idvideo-see");


--
-- Name: fki_fk_video_idcourse; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_video_idcourse ON video USING btree ("idcourse-video");


--
-- Name: fki_i; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_i ON ratingcourse USING btree ("iduser-ratingcourse");


--
-- Name: course fk_course_idteacher; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course
    ADD CONSTRAINT fk_course_idteacher FOREIGN KEY ("idteacher-course") REFERENCES teacher(idteacher) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: live fk_live_idcourse; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY live
    ADD CONSTRAINT fk_live_idcourse FOREIGN KEY ("idcourse-live") REFERENCES course(idcourse) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: possescourse fk_possesscourse_idcourse; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY possescourse
    ADD CONSTRAINT fk_possesscourse_idcourse FOREIGN KEY ("idcourse-possescourse") REFERENCES course(idcourse) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: possescourse fk_possesscourse_iduser; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY possescourse
    ADD CONSTRAINT fk_possesscourse_iduser FOREIGN KEY ("iduser-possescourse") REFERENCES student(idstudent) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: ratingcourse fk_ratingcourse_idcourse; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ratingcourse
    ADD CONSTRAINT fk_ratingcourse_idcourse FOREIGN KEY ("idcourse-ratingcourse") REFERENCES course(idcourse) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: ratingcourse fk_ratingcourse_iduser; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ratingcourse
    ADD CONSTRAINT fk_ratingcourse_iduser FOREIGN KEY ("iduser-ratingcourse") REFERENCES student(idstudent) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: ratingvideo fk_ratingvideo_iduser; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ratingvideo
    ADD CONSTRAINT fk_ratingvideo_iduser FOREIGN KEY ("iduser-ratingvideo") REFERENCES student(idstudent) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: ratingvideo fk_ratingvideo_idvideo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ratingvideo
    ADD CONSTRAINT fk_ratingvideo_idvideo FOREIGN KEY ("idvideo-ratingvideo") REFERENCES video(idvideo) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: see fk_see_iduser; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY see
    ADD CONSTRAINT fk_see_iduser FOREIGN KEY ("iduser-see") REFERENCES student(idstudent) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: see fk_see_idvideo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY see
    ADD CONSTRAINT fk_see_idvideo FOREIGN KEY ("idvideo-see") REFERENCES video(idvideo) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: video fk_video_idcourse; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY video
    ADD CONSTRAINT fk_video_idcourse FOREIGN KEY ("idcourse-video") REFERENCES course(idcourse) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

