package bo.edu.ucb.sis213.finalbackend.dto;

public class SuggestionDto {
    private int idSuggestion;
    private int userIdUser;
    private int totalSongs;
    private String favoriteSongs;

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

    private String favoriteArtists;
}
