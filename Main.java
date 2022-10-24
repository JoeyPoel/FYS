import java.util.Scanner;

/**
 * Vul interesses in en krijg het als options om vervolgens in profiel bestand bij select toe te voegen
 * 
 * @author JoeyPoel
 */

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        System.out.print("Hoe veel keer wil je een interesse invullen? ");
        int hoeVaak = in.nextInt();


        String[] output = InteresseMethod(hoeVaak) ;
        for (int i = 0; i < hoeVaak; i++){
            System.out.println("<option value=\"" + output[i] +  "\">" + output[i] + "</option>");
        }
    }

    public static String[] InteresseMethod (int hoeVaak){
        Scanner in = new Scanner(System.in);
        String[] Interesse = new String[hoeVaak];

        for (int i = 0; i < hoeVaak; i++){
            System.out.print("Vul hier de interesse in: ");
            Interesse[i] = in.nextLine();
        }
        return Interesse;
    }
}



