package app.vercel.webrew.controller;

import app.vercel.webrew.service.ProductService;
import app.vercel.webrew.model.Product;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
public class ProductServiceControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    private Product productA, productB, productC, productToUpdate;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void init() {
        productA = new Product(1, "Green tea", Product.ProductType.Tea, Product.TeaFormat.Tea_bag, 12.45, "Singapore", "Something here for description blah", "/img/teas/african-rooibos-honeybush.jpg");
        productB = new Product(2, "Red tea", Product.ProductType.Tea, Product.TeaFormat.Loose_leaf, 38.1, "Taiwan", "Lorem ipsum dolor sit amet, consectetur adipiscing elit", "/img/teas/oolong-tea.jpg");
        productC = new Product(3, "Purple tea", Product.ProductType.Tea, Product.TeaFormat.Loose_leaf, 42.55, "Malaysia", "Aenean quis nibh elit.", "/img/teas/herbal-floral-tea.jpg");
        productToUpdate = new Product(2, "Red tea", Product.ProductType.Tea, Product.TeaFormat.Tea_bag, 39.9, "Thailand", "Fusce vel bibendum turpis, nec euismod sem", "/img/teas/white-tea.jpg");
    }

    @Test
    @DisplayName("Get all products")
    void getAllProducts() throws Exception {
        // Test case
        List<Product> productList = new ArrayList<>();
        productList.add(productA);
        productList.add(productB);
        productList.add(productC);

        // Perform test
        when(productService.getProducts()).thenReturn(productList);

        this.mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(productList.size())));
    }

    @Test
    @DisplayName("Get a product by id - valid id")
    void getProductById() throws Exception {
        // Test case
        when(productService.getProduct(any(Integer.class)))
                .thenReturn(Optional.ofNullable(productA));
        // Perform test
        this.mockMvc.perform(get("/api/products/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(productA.getId())))
                .andExpect(jsonPath("$.name", is(productA.getName())))
                .andExpect(jsonPath("$.type", is(productA.getType().toString())))
                .andExpect(jsonPath("$.format", is(productA.getFormat().toString())))
                .andExpect(jsonPath("$.price", is(productA.getPrice())))
                .andExpect(jsonPath("$.country", is(productA.getCountry())))
                .andExpect(jsonPath("$.description", is(productA.getDescription())))
                .andExpect(jsonPath("$.imagePath", is(productA.getImagePath())));
    }

    @Test
    @DisplayName("Create product - valid parameters")
    void createProduct() throws Exception {
        // Test case
        when(productService.createProduct(any(Product.class)))
                .thenReturn(productA);

        // Perform test
        this.mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productA)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(productA.getId())))
                .andExpect(jsonPath("$.name", is(productA.getName())))
                .andExpect(jsonPath("$.type", is(productA.getType().toString())))
                .andExpect(jsonPath("$.format", is(productA.getFormat().toString())))
                .andExpect(jsonPath("$.price", is(productA.getPrice())))
                .andExpect(jsonPath("$.country", is(productA.getCountry())))
                .andExpect(jsonPath("$.description", is(productA.getDescription())))
                .andExpect(jsonPath("$.imagePath", is(productA.getImagePath())));
    }

    @Test
    @DisplayName("Update a product")
    void updateProduct() throws Exception {
        // Test case
        when(productService.updateProduct(any(Integer.class), any(Product.class)))
                .thenReturn(productToUpdate);
        // Perform test
        this.mockMvc.perform(put("/api/products/{id}", "2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productToUpdate)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(productToUpdate.getId())))
                .andExpect(jsonPath("$.name", is(productToUpdate.getName())))
                .andExpect(jsonPath("$.type", is(productToUpdate.getType().toString())))
                .andExpect(jsonPath("$.format", is(productToUpdate.getFormat().toString())))
                .andExpect(jsonPath("$.price", is(productToUpdate.getPrice())))
                .andExpect(jsonPath("$.country", is(productToUpdate.getCountry())))
                .andExpect(jsonPath("$.description", is(productToUpdate.getDescription())))
                .andExpect(jsonPath("$.imagePath", is(productToUpdate.getImagePath())));
    }

    @Test
    @DisplayName("Delete product - valid product id")
    void deleteProduct() throws Exception {
        // Test data
        Integer id = productC.getId();
        // Mock productService to return productC
        when(productService.getProduct(id)).thenReturn(Optional.of(productC));

        // Perform test
        this.mockMvc.perform(delete("/api/products/{id}", id)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().string("Product deleted."))
                .andExpect(status().isOk());
    }
}
