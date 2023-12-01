package bo.edu.ucb.sis213.finalbackend.dto;

public class SongDto {
    private int idSong;
    private int albumArtistIdAlbumArtist;
    private String name;

    public int getIdSong() {
        return idSong;
    }

    public void setIdSong(int idSong) {
        this.idSong = idSong;
    }

    public int getAlbumArtistIdAlbumArtist() {
        return albumArtistIdAlbumArtist;
    }

    public void setAlbumArtistIdAlbumArtist(int albumArtistIdAlbumArtist) {
        this.albumArtistIdAlbumArtist = albumArtistIdAlbumArtist;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdSpotify() {
        return idSpotify;
    }

    public void setIdSpotify(String idSpotify) {
        this.idSpotify = idSpotify;
    }

    private String idSpotify;
}
