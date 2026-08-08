#include <iostream>
#include <cstdlib>
#include <ctime>

int main() {
    srand(time(0));
    int numeroSecreto = rand() % 100 + 1;
    int chute = 0;
    int tentativas = 0;

    std::cout << "=== JOGO DE ADIVINHACAO ===" << std::endl;
    std::cout << "Tente adivinhar o numero entre 1 e 100!" << std::endl;

    while (chute != numeroSecreto) {
        std::cout << "Digite seu palpite: ";
        std::cin >> chute;
        tentativas++;

        if (chute > numeroSecreto) {
            std::cout << "Muito alto! Tente um menor.\n";
        } else if (chute < numeroSecreto) {
            std::cout << "Muito baixo! Tente um maior.\n";
        } else {
            std::cout << "\nParabens! Voce acertou em " << tentativas << " tentativas!\n";
        }
    }
    return 0;
}
