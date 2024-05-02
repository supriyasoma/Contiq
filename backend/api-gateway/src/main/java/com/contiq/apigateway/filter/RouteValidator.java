package com.contiq.apigateway.filter;

import java.util.List;
import java.util.function.Predicate;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@NoArgsConstructor
public class RouteValidator {

  public static final List<String> openApiEndpoints = List.of(
    " /api/v1/users/"
  );

  public static final Predicate<ServerHttpRequest> isSecured = request ->
    openApiEndpoints
      .stream()
      .noneMatch(uri -> request.getURI().getPath().equals(uri)) &&
    !request.getQueryParams().containsKey("email");
}
