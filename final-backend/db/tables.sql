-- tables
-- Table: album
CREATE TABLE album (
    id_album int  NOT NULL,
    name varchar(250)  NOT NULL,
    release_date date  NOT NULL,
    id_spotify varchar(250)  NOT NULL,
    CONSTRAINT album_pk PRIMARY KEY (id_album)
);

-- Table: album_artist
CREATE TABLE album_artist (
    id_album_artist int  NOT NULL,
    album_id_album int  NOT NULL,
    artist_id_artist int  NOT NULL,
    CONSTRAINT album_artist_pk PRIMARY KEY (id_album_artist)
);

-- Table: artist
CREATE TABLE artist (
    id_artist int  NOT NULL,
    name int  NOT NULL,
    id_spotify varchar(250)  NOT NULL,
    CONSTRAINT artist_pk PRIMARY KEY (id_artist)
);

-- Table: genre
CREATE TABLE genre (
    id_genre int  NOT NULL,
    name varchar(50)  NOT NULL,
    id_spotify varchar(250)  NOT NULL,
    CONSTRAINT genre_pk PRIMARY KEY (id_genre)
);

-- Table: playlist
CREATE TABLE playlist (
    id_playlist int  NOT NULL,
    suggestion_id_suggestion int  NOT NULL,
    name varchar(250)  NOT NULL,
    description Text  NOT NULL,
    creation_date timestamp  NOT NULL,
    CONSTRAINT playlist_pk PRIMARY KEY (id_playlist)
);

-- Table: playlist_song
CREATE TABLE playlist_song (
    id_playlist_song int  NOT NULL,
    playlist_id_playlist int  NOT NULL,
    song_id_song int  NOT NULL,
    CONSTRAINT playlist_song_pk PRIMARY KEY (id_playlist_song)
);

-- Table: song
CREATE TABLE song (
    id_song int  NOT NULL,
    album_artist_id_album_artist int  NOT NULL,
    name varchar(100)  NOT NULL,
    id_spotify varchar(250)  NOT NULL,
    CONSTRAINT song_pk PRIMARY KEY (id_song)
);

-- Table: song_genre
CREATE TABLE song_genre (
    id_song_genre int  NOT NULL,
    song_id_song int  NOT NULL,
    genre_id_genre int  NOT NULL,
    CONSTRAINT song_genre_pk PRIMARY KEY (id_song_genre)
);

-- Table: suggestion
CREATE TABLE suggestion (
    id_suggestion int  NOT NULL,
    user_id_user int  NOT NULL,
    total_songs int  NOT NULL,
    favoite_songs Text  NULL,
    favorite_artists Text  NULL,
    CONSTRAINT suggestion_pk PRIMARY KEY (id_suggestion)
);

-- Table: user
CREATE TABLE "user" (
    id_user int  NOT NULL,
    username varchar(100)  NOT NULL,
    followers int  NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id_user)
);

-- foreign keys
-- Reference: album_artist_album (table: album_artist)
ALTER TABLE album_artist ADD CONSTRAINT album_artist_album
    FOREIGN KEY (album_id_album)
    REFERENCES album (id_album)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: album_artist_artista (table: album_artist)
ALTER TABLE album_artist ADD CONSTRAINT album_artist_artista
    FOREIGN KEY (artist_id_artist)
    REFERENCES artist (id_artist)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: playlist_song_playlist (table: playlist_song)
ALTER TABLE playlist_song ADD CONSTRAINT playlist_song_playlist
    FOREIGN KEY (playlist_id_playlist)
    REFERENCES playlist (id_playlist)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: playlist_song_song (table: playlist_song)
ALTER TABLE playlist_song ADD CONSTRAINT playlist_song_song
    FOREIGN KEY (song_id_song)
    REFERENCES song (id_song)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: playlist_suggestion (table: playlist)
ALTER TABLE playlist ADD CONSTRAINT playlist_suggestion
    FOREIGN KEY (suggestion_id_suggestion)
    REFERENCES suggestion (id_suggestion)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: song_album_artist (table: song)
ALTER TABLE song ADD CONSTRAINT song_album_artist
    FOREIGN KEY (album_artist_id_album_artist)
    REFERENCES album_artist (id_album_artist)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: song_genre_genre (table: song_genre)
ALTER TABLE song_genre ADD CONSTRAINT song_genre_genre
    FOREIGN KEY (genre_id_genre)
    REFERENCES genre (id_genre)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: song_genre_song (table: song_genre)
ALTER TABLE song_genre ADD CONSTRAINT song_genre_song
    FOREIGN KEY (song_id_song)
    REFERENCES song (id_song)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: suggestion_user (table: suggestion)
ALTER TABLE suggestion ADD CONSTRAINT suggestion_user
    FOREIGN KEY (user_id_user)
    REFERENCES "user" (id_user)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;
