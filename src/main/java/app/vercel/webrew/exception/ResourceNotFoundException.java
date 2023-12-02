package app.vercel.webrew.exception;

public class ResourceNotFoundException extends RuntimeException {

    // Constructor to handle when task with id not found
    public ResourceNotFoundException(Integer id){
        super("Could not find task: "+id+".");
    }
}
