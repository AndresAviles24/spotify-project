package bo.edu.ucb.sis213.finalbackend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import  bo.edu.ucb.sis213.finalbackend.entity.PlaylistSong;
@Repository
public interface PlaylistSongRepository extends JpaRepository<PlaylistSong, Integer> {
    // Métodos personalizados si son necesarios
}