package bo.edu.ucb.sis213.finalbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "album_artist")
public class AlbumArtist {
    @Id
    private int idAlbumArtist;
    private int albumIdAlbum;

    public int getIdAlbumArtist() {
        return idAlbumArtist;
    }

    public void setIdAlbumArtist(int idAlbumArtist) {
        this.idAlbumArtist = idAlbumArtist;
    }

    public int getAlbumIdAlbum() {
        return albumIdAlbum;
    }

    public void setAlbumIdAlbum(int albumIdAlbum) {
        this.albumIdAlbum = albumIdAlbum;
    }

    public int getArtistIdArtist() {
        return artistIdArtist;
    }

    public void setArtistIdArtist(int artistIdArtist) {
        this.artistIdArtist = artistIdArtist;
    }

    private int artistIdArtist;
}
