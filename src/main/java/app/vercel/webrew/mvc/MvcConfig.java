package app.vercel.webrew.mvc;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/index").setViewName("index");
        registry.addViewController("/our-story").setViewName("our-story");
        registry.addViewController("/products").setViewName("products");
        registry.addViewController("/product-details").setViewName("product-details");
        registry.addViewController("/add-product").setViewName("add-product");
        registry.addViewController("/update-product").setViewName("update-product");
        registry.addViewController("/api").setViewName("api");
        registry.addViewController("/login-page").setViewName("login-page");
        registry.addViewController("/enquiry-form").setViewName("enquiry-form");
        registry.addViewController("/error/404").setViewName("not-found");
        registry.addViewController("/error/40x").setViewName("unauthorised");
        registry.addViewController("/error/error").setViewName("error");
        registry.addViewController("/error").setViewName("error");
    }
}
