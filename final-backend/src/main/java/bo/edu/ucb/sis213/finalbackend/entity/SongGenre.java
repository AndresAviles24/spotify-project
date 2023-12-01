package bo.edu.ucb.sis213.finalbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "song_genre")
public class SongGenre {
    @Id
    private int idSongGenre;
    private int songIdSong;

    public int getIdSongGenre() {
        return idSongGenre;
    }

    public void setIdSongGenre(int idSongGenre) {
        this.idSongGenre = idSongGenre;
    }

    public int getSongIdSong() {
        return songIdSong;
    }

    public void setSongIdSong(int songIdSong) {
        this.songIdSong = songIdSong;
    }

    public int getGenreIdGenre() {
        return genreIdGenre;
    }

    public void setGenreIdGenre(int genreIdGenre) {
        this.genreIdGenre = genreIdGenre;
    }

    private int genreIdGenre;

}
