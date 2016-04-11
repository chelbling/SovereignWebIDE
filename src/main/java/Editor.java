/**
 * Created by cody on 23/03/16.
 */

import org.eclipse.jetty.websocket.api.*;
import static spark.Spark.*;
import java.text.*;
import java.util.*;



public class Editor {
    static Map<Session, String> userUsernameMap = new HashMap<>();
    static int nextUserNumber = 1;
    static String file = "";
    static String prev_cmd = "";


    public static void main(String[] args) {
        staticFileLocation("public"); //index.html is served at localhost:4567 (default port)
        webSocket("/editor", EditorHandler.class);
        init();
    }


    public static void updateEditors(String sender, String update) {
        userUsernameMap.keySet().stream().filter(Session::isOpen).forEach(session -> {
            try {
                //file.add(update);
                Editor.file = update;
                if (update.length() > file.length()){
                    System.out.print("Editor: " + file + "\n");
                }
                session.getRemote().sendString(String.valueOf(file));

            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
