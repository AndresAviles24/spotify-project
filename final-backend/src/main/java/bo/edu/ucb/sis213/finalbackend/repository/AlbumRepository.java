package bo.edu.ucb.sis213.finalbackend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import  bo.edu.ucb.sis213.finalbackend.entity.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Integer> {

}