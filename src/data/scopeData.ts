export type ScopeId = 'request' | 'session' | 'prototype'

export interface ScopeContent {
  scopeLabel: string
  brokenCode: string
  brokenFilename: string
  brokenHighlightLines: number[]
  errorMessage: string
  fixedCode: string
  fixedFilename: string
  fixedHighlightLines: number[]
  enterpriseImpact: string
}

export const scopeData: Record<ScopeId, ScopeContent> = {
  request: {
    scopeLabel: 'Request',
    brokenCode: `package com.example.order;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

@Service
public class OrderService {

    private final CartContext cartContext;

    public OrderService(CartContext cartContext) {
        this.cartContext = cartContext;
    }

    public void addToOrder(String productId) {
        cartContext.addItem(productId);
    }
}

@RequestScope
@Component
class CartContext {
    private final List<String> items = new ArrayList<>();
    void addItem(String id) { items.add(id); }
}`,
    brokenFilename: 'OrderService.java',
    brokenHighlightLines: [12, 13, 14, 15, 23],
    errorMessage: `Error creating bean with name 'orderService': Unsatisfied dependency expressed through constructor parameter 0: Error creating bean with name 'cartContext': Scope 'request' is not active for the current thread; consider defining a scoped proxy for this bean if you intend to refer to it from a singleton.`,
    fixedCode: `package com.example.order;

import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

@Service
public class OrderService {

    private final CartContext cartContext;

    public OrderService(CartContext cartContext) {
        this.cartContext = cartContext;
    }

    public void addToOrder(String productId) {
        cartContext.addItem(productId);
    }
}

@RequestScope(proxyMode = ScopedProxyMode.TARGET_CLASS)
@Component
class CartContext {
    private final List<String> items = new ArrayList<>();
    void addItem(String id) { items.add(id); }
}`,
    fixedFilename: 'OrderService.java',
    fixedHighlightLines: [5, 24],
    enterpriseImpact:
      'A singleton is created once at startup. A request-scoped bean is created per HTTP request. The container cannot inject a request-scoped bean directly into a singleton constructor because no request exists at startup. Using ScopedProxyMode.TARGET_CLASS injects a proxy that delegates to the real request-scoped instance when a request is active.',
  },
  session: {
    scopeLabel: 'Session',
    brokenCode: `package com.example.shop;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@Service
public class CartService {

    private final UserCart userCart;

    public CartService(UserCart userCart) {
        this.userCart = userCart;
    }

    public void addToCart(String productId) {
        userCart.addItem(productId);
    }
}

@SessionScope
@Component
class UserCart {
    private final List<String> items = new ArrayList<>();
    void addItem(String id) { items.add(id); }
}`,
    brokenFilename: 'CartService.java',
    brokenHighlightLines: [12, 13, 14,15,23],
    errorMessage: `Error creating bean with name 'cartService': Unsatisfied dependency expressed through constructor parameter 0: Error creating bean with name 'userCart': Scope 'session' is not active for the current thread; consider defining a scoped proxy for this bean if you intend to refer to it from a singleton.`,
    fixedCode: `package com.example.shop;

import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@Service
public class CartService {

    private final UserCart userCart;

    public CartService(UserCart userCart) {
        this.userCart = userCart;
    }

    public void addToCart(String productId) {
        userCart.addItem(productId);
    }
}

@SessionScope(proxyMode = ScopedProxyMode.TARGET_CLASS)
@Component
class UserCart {
    private final List<String> items = new ArrayList<>();
    void addItem(String id) { items.add(id); }
}`,
    fixedFilename: 'CartService.java',
    fixedHighlightLines: [5, 24],
    enterpriseImpact:
      'A singleton is created once at startup. A session-scoped bean is created per HTTP session. The container cannot inject a session-scoped bean directly into a singleton constructor because no session exists at startup. Using ScopedProxyMode.TARGET_CLASS injects a proxy that delegates to the real session-scoped instance when a session is active.',
  },
  prototype: {
    scopeLabel: 'Prototype',
    brokenCode: `package com.example.batch;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class BatchProcessor {

    private final TaskIdGenerator taskIdGenerator;

    public BatchProcessor(TaskIdGenerator taskIdGenerator) {
        this.taskIdGenerator = taskIdGenerator;
    }

    public void process() {
        String id1 = taskIdGenerator.nextId();
        String id2 = taskIdGenerator.nextId();
        // id1 and id2 from SAME instance - misleading
    }
}

@Scope("prototype")
@Component
class TaskIdGenerator {
    private int counter = 0;
    public String nextId() { return "task-" + (++counter); }
}`,
    brokenFilename: 'BatchProcessor.java',
    brokenHighlightLines: [10, 11, 12, 13, 23],
    errorMessage: `(No exception; wrong behavior at runtime.)
Each call to taskIdGenerator.nextId() uses the SAME prototype instance because the prototype was injected once when the singleton was created. You get "task-1", "task-2" from the same bean instance, not a fresh instance per use.`,
    fixedCode: `package com.example.batch;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class BatchProcessor {

    private final ObjectProvider<TaskIdGenerator> taskIdGeneratorProvider;

    public BatchProcessor(ObjectProvider<TaskIdGenerator> provider) {
        this.taskIdGeneratorProvider = provider;
    }

    public void process() {
        TaskIdGenerator gen1 = taskIdGeneratorProvider.getObject();
        TaskIdGenerator gen2 = taskIdGeneratorProvider.getObject();
        String id1 = gen1.nextId();
        String id2 = gen2.nextId();
        // id1 and id2 from different prototype instances
    }
}

@Scope("prototype")
@Component
class TaskIdGenerator {
    private int counter = 0;
    public String nextId() { return "task-" + (++counter); }
}`,
    fixedFilename: 'BatchProcessor.java',
    fixedHighlightLines: [3, 11, 12, 13, 14, 18, 19],
    enterpriseImpact:
      'Injecting a prototype into a singleton gives you one prototype instance for the lifetime of the singleton. ObjectProvider.getObject() asks the container for a fresh bean each time, so you get a new prototype instance per call. Use this when the singleton must obtain a new prototype instance on each use.',
  },
}

export const scopeIds: ScopeId[] = ['request', 'session', 'prototype']

export const scopeTabLabels: Record<ScopeId, string> = {
  request: 'Request Scope',
  session: 'Session Scope',
  prototype: 'Prototype Scope',
}
