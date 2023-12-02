package app.vercel.webrew.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import app.vercel.webrew.model.Product;

public interface WeBrewRepository extends JpaRepository<Product, Integer>{
    Product findByName(String productName);
}
