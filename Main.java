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
        for (int i = 0; i <= hoeVaak; i++) {
            System.out.print("Vul hier de interesse in: ");
            String input = in.nextLine();
            System.out.printf("<option value=\"%s\">%s</option>\n\n", input, input);

        }

    }
}
/*
    public static String Input (int hoeVaak){
        Scanner in = new Scanner(System.in);
        String[] InputArray = new String();
        for(int i = 0; i <= hoeVaak; i++){
            System.out.print("Vul hier de interesse in: ");
            String input = in.nextLine();
            System.out.printf("<option value=\"%s\">%s</option>\n\n",input,input);
            InputArray[i] = input.nextFloat();
        }
    }
 */
