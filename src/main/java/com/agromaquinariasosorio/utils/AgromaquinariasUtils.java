package com.agromaquinariasosorio.utils;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AgromaquinariasUtils {

  public static void printError(final String msjError, final HttpServletResponse response) throws IOException {
    response.getWriter().print("{\"msj\": \"" + msjError + "\"}");

  }

  public static void printMessage(final String msj, final boolean rpt, final HttpServletResponse response) throws IOException {
    response.getWriter().print("{\"rpt\": " + rpt + ", \"msj\": \"" + msj + "\"}");
  }
}
