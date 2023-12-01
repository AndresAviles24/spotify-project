package bo.edu.ucb.sis213.finalbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "playlist_song")
public class PlaylistSong {
    @Id
    private int idPlaylistSong;

    public int getIdPlaylistSong() {
        return idPlaylistSong;
    }

    public void setIdPlaylistSong(int idPlaylistSong) {
        this.idPlaylistSong = idPlaylistSong;
    }

    public int getPlaylistIdPlaylist() {
        return playlistIdPlaylist;
    }

    public void setPlaylistIdPlaylist(int playlistIdPlaylist) {
        this.playlistIdPlaylist = playlistIdPlaylist;
    }

    public int getSongIdSong() {
        return songIdSong;
    }

    public void setSongIdSong(int songIdSong) {
        this.songIdSong = songIdSong;
    }

    private int playlistIdPlaylist;
    private int songIdSong;
}
