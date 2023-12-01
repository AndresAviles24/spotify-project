package bo.edu.ucb.sis213.finalbackend.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "playlist")
public class Playlist {
    @Id
    private int idPlaylist;
    private int suggestionIdSuggestion;
    private String name;
    private String description;

    public int getIdPlaylist() {
        return idPlaylist;
    }

    public void setIdPlaylist(int idPlaylist) {
        this.idPlaylist = idPlaylist;
    }

    public int getSuggestionIdSuggestion() {
        return suggestionIdSuggestion;
    }

    public void setSuggestionIdSuggestion(int suggestionIdSuggestion) {
        this.suggestionIdSuggestion = suggestionIdSuggestion;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Timestamp creationDate) {
        this.creationDate = creationDate;
    }

    private Timestamp creationDate;
}
