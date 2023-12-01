package bo.edu.ucb.sis213.finalbackend.entity;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "album")
public class Album {
    @Id
    private int idAlbum;
    private String name;
    private Date releaseDate;
    private String idSpotify;

    public int getIdAlbum() {
        return idAlbum;
    }

    public void setIdAlbum(int idAlbum) {
        this.idAlbum = idAlbum;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getIdSpotify() {
        return idSpotify;
    }

    public void setIdSpotify(String idSpotify) {
        this.idSpotify = idSpotify;
    }
}
