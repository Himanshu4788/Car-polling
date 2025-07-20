//package com.edigest.myfirstproject;
package com.edigest.myfirstproject;

import com.edigest.myfirstproject.backend.Main;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class FormController {

    @PostMapping("/submit")
    public String handleForm(
            @RequestParam String id,
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam(required = false) String seatsInput,
            @RequestParam(required = false) String detourInput
    ) {
        return Main.main(
                id,
                source,
                destination,
                detourInput != null ? detourInput : "",
                seatsInput != null ? seatsInput : "1"
        );
    }
}