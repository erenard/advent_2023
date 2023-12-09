import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.*;

public class Day9 {
    List<String> lines;
    List<History> history = new ArrayList<History>();

    static List<String> readFile(String filename) throws IOException {
        File file = new File(filename);
        Scanner scanner = new Scanner(file);
        List<String> list = new ArrayList<String>();
        while(scanner.hasNextLine()) {
            list.add(scanner.nextLine());
        }
        scanner.close();
        return list;
    }

    Day9(List<String> lines) throws IOException {
        this.lines = lines;
        for(String line : lines) {
            History h = new History(line);
            history.add(h);
        }
    }

    class History {
        List<Integer> firstValues = new ArrayList<Integer>();
        List<Integer> lastValues = new ArrayList<Integer>();
        History(String line) {
            List<Integer> numbers = Arrays.stream(line.split(" ")).map(Integer::parseInt).toList();
            while (numbers.stream().mapToInt(Integer::intValue).sum() != 0) {
                firstValues.add(numbers.get(0));
                lastValues.add(numbers.get(numbers.size() - 1));
                List<Integer> nextNumbers = new ArrayList<Integer>();
                for(int i = 0; i < numbers.size() - 1; i++) {
                    nextNumbers.add(numbers.get(i + 1) - numbers.get(i));
                }
                numbers = nextNumbers;
            }
        }
        int nextValue() {
            return lastValues.stream().mapToInt(Integer::intValue).sum();
        }
        int previousValue() {
            int previousValue = 0;
            for(int i = firstValues.size() - 1; i >= 0; i--) {
                previousValue = firstValues.get(i) - previousValue;
            }
            return previousValue;
        }
    }

    int sumNextValues() {
        return history.stream().mapToInt(h -> h.nextValue()).sum();
    }

    int sumPreviousValues() {
        return history.stream().mapToInt(h -> h.previousValue()).sum();
    }

    public static void main(String[] args) {
        try {
            List<String> lines = Day9.readFile("day9.input.txt");
            Day9 day = new Day9(lines);
            System.out.println(day.sumNextValues());
            System.out.println(day.sumPreviousValues());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

