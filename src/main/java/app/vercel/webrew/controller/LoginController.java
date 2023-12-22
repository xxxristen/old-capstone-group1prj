package app.vercel.webrew.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    // Method - DRY
    private String handleAuthenticatedUser(String returnValue, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        model.addAttribute("username", username);
        return returnValue;
    }

    @GetMapping("/index.html")
    public String redirectToRoot() {
        return "redirect:/";
    }

    @GetMapping("/")
    public String indexPage(String returnValue, Model model) {
        return handleAuthenticatedUser("index", model);
    }

    @GetMapping("/login-page")
    public String loginPage(String returnValue, Model model) {
        return handleAuthenticatedUser("login-page", model);
    }

    @GetMapping("/our-story.html")
    public String aboutUs(String returnValue, Model model) {
        return handleAuthenticatedUser("our-story.html", model);
    }

    @GetMapping("/products.html")
    public String productsPage(String returnValue, Model model) {
        return handleAuthenticatedUser("products.html", model);
    }

    @GetMapping("/add-product.html")
    public String addProductsPage(String returnValue, Model model) {
        return handleAuthenticatedUser("add-product.html", model);
    }

    @GetMapping("/product-details.html")
    public String productDetailsPage(String returnValue, Model model) {
        return handleAuthenticatedUser("product-details.html", model);
    }

    @GetMapping("/error/404.html")
    public String error404Page(String returnValue, Model model) {
        return handleAuthenticatedUser("/error/404.html", model);
    }

    @GetMapping("/error/40x.html")
    public String error40xPage(String returnValue, Model model) {
        return handleAuthenticatedUser("/error/40x.html", model);
    }

    @GetMapping("/error/error.html")
    public String errorPage(String returnValue, Model model) {
        return handleAuthenticatedUser("/error/error.html", model);
    }
    @GetMapping("/error")
    public String errorPage2(String returnValue, Model model) {
        return handleAuthenticatedUser("/error.html", model);
    }
}
