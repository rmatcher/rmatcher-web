package com.rmatcher.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created with IntelliJ IDEA.
 * User: ameen
 * Date: 4/12/13
 * Time: 5:01 PM
 */

@Controller
public class HomeController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home(ModelMap model) {
        return "home";
    }

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public String homeWithName(@PathVariable String name, ModelMap model) {
        model.addAttribute("name", "Hello " + name);
        return "home";
    }
}