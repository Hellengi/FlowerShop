package com.github.hellengi.flowershop.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class CustomService {
    public HashMap<Long, Integer> getFlowersInCustom(HttpSession session) {
        Object object = session.getAttribute("custom");
        if (object == null) {
            HashMap<Long, Integer> customBouquet = new HashMap<Long, Integer>();
            session.setAttribute("custom", customBouquet);
            return customBouquet;
        }
        @SuppressWarnings("unchecked")
        HashMap<Long, Integer> customBouquet = (HashMap<Long, Integer>) object;
        return customBouquet;
    }

    public void addFlowerToCustom(Long id, HttpSession session) {
        HashMap<Long, Integer> customBouquet = getFlowersInCustom(session);
        customBouquet.put(id, customBouquet.getOrDefault(id, 0) + 1);
        session.setAttribute("custom", customBouquet);
    }

    public Integer getAmountOfFlowerInCustom(Long id, HttpSession session) {
        HashMap<Long, Integer> customBouquet = getFlowersInCustom(session);
        return customBouquet.getOrDefault(id, 0);
    }

    public void setAmountForFlowerInCustom(Long id, Integer amount, HttpSession session) {
        HashMap<Long, Integer> customBouquet = getFlowersInCustom(session);
        if (amount > 0) customBouquet.put(id, amount);
        else customBouquet.remove(id);
        session.setAttribute("custom", customBouquet);
    }

    public void deleteCurrentCustom(HttpSession session) {
        HashMap<Long, Integer> customBouquet = new HashMap<>();
        session.setAttribute("custom", customBouquet);
    }
}
