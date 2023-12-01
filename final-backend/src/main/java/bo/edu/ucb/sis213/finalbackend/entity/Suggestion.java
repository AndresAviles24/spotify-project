package bo.edu.ucb.sis213.finalbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "suggestion")
public class Suggestion {
    @Id
    private int idSuggestion;
    private int userIdUser;
    private int totalSongs;

    public int getIdSuggestion() {
        return idSuggestion;
    }

    public void setIdSuggestion(int idSuggestion) {
        this.idSuggestion = idSuggestion;
    }

    public int getUserIdUser() {
        return userIdUser;
    }

    public void setUserIdUser(int userIdUser) {
        this.userIdUser = userIdUser;
    }

    public int getTotalSongs() {
        return totalSongs;
    }

    public void setTotalSongs(int totalSongs) {
        this.totalSongs = totalSongs;
    }

    public String getFavoriteSongs() {
        return favoriteSongs;
    }

    public void setFavoriteSongs(String favoriteSongs) {
        this.favoriteSongs = favoriteSongs;
    }

    public String getFavoriteArtists() {
        return favoriteArtists;
    }

    public void setFavoriteArtists(String favoriteArtists) {
        this.favoriteArtists = favoriteArtists;
    }

    private String favoriteSongs; // Tipo Text en SQL
    private String favoriteArtists; // Tipo Text en SQL
}
