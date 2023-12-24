package app.vercel.webrew.mvc;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    // @Override
    // public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // registry.addResourceHandler("/resources/templates/**")
    // .addResourceLocations("/resources/static/");
    // }
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/index").setViewName("index");
        registry.addViewController("/our-story").setViewName("our-story.html");
        registry.addViewController("/products").setViewName("products");
        registry.addViewController("/add-product").setViewName("add-product");
        registry.addViewController("/api").setViewName("api");
        registry.addViewController("/login-page").setViewName("login-page");
        registry.addViewController("/error/404").setViewName("not-found");
        registry.addViewController("/error/40x").setViewName("unauthorised");
        registry.addViewController("/error/error").setViewName("error");
    }

}
