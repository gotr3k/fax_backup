#include <iostream>
#include <stdlib.h>
using namespace std;


class graf {
private:
	int b[50][50];
	int ukupcv;
	bool cvpostoji[50];
public:
	graf(int n=0)
	{
		for (int i = 0; i < 50; i++) cvpostoji[i] = false;
		ukupcv = 0;
		for (int i = 0; i < n; i++)
		{
			cvpostoji[i] = true;
			ukupcv++;
			for (int j = 0; j < n; j++)
			{
				b[i][j] = 0;
			}
		}
	}
	void inicgraf(int n)
	{
		for (int i = 0; i < 50; i++) cvpostoji[i] = false;
		ukupcv = 0;
		for (int i = 0; i < n; i++)
		{
			cvpostoji[i] = true;
			ukupcv++;
			for (int j = 0; j < n; j++)
			{
				b[i][j] = 0;
			}
		}
	}
	void ispisgrafa()
	{
		
		cout << "\n";
		for (int i = 0; i < ukupcv; i++)
		{
			if (cvpostoji[i])
			{
				cout << "Cvor: " << i + 1 << " ";
				for (int j = 0; j < ukupcv; j++)
				{
					if (!cvpostoji[j]) { continue; }
					cout << "|" << b[i][j];
				}
				cout << "|\n";
			}
		}
	}

	void ispismatrice()
	{
		
		cout << "\nCela matrica grafa: \n";
		for (int i = 0; i < ukupcv; i++)
		{
			cout << "Cvor: " << i + 1 << " ";
			for (int j = 0; j < ukupcv; j++)
			{
				cout << "|" << b[i][j];
			}
			cout << "|\n";
		}
	}

	void dodajcvor()
	{
		for (int i = 0; i < ukupcv; i++)
		{
			if (!cvpostoji[i])
			{
				for (int j = 0; j <= ukupcv; j++)
				{
					b[i][j] = 0;
					b[j][i] = 0;
					cvpostoji[i] = true;
				}
				cout << "\nNovi cvor dodat na mesto: " << i + 1<<" !";
				return;
			}
		}
		for (int i = 0; i <= ukupcv; i++)
		{ 
			b[ukupcv][i] = 0;
			b[i][ukupcv] = 0;
		}
		cvpostoji[ukupcv] = true;
		cout << "\nNovi cvor dodat na novo mesto: " << ukupcv +1 << " !";
		ukupcv++;
	}
	void uklonicvor(int n) 
	{
		if(n>ukupcv) { cout << "Greska! Cvor je van opsega!"; return; }
		if (!cvpostoji[n-1]) { cout << "Greska! Vec ste obrisali taj cvor!"; return; }
		cout << "\nBrisanje cvora: " << n;
		/*for (int i = 0; i < ukupcv; i++)
		{
			b[n-1][i] = -1;
			b[i][n-1] = -1;
		}*/
		cvpostoji[n - 1] = false;
	}
	void dodajgranu(int prvi, int drugi) 
	{
		if ((prvi <= ukupcv) && (drugi <= ukupcv) && (cvpostoji[prvi - 1]) && (cvpostoji[drugi - 1]))
		{
			b[prvi - 1][drugi - 1] = 1;
			b[drugi - 1][prvi - 1] = 1;
		}
		else 
		{
			cout << "Greska! Neki od cvorova ne postoji u grafu!";
		}
	}

	void brisigranu(int prvi, int drugi)
	{
		if ((prvi <= ukupcv) && (drugi <= ukupcv) && (cvpostoji[prvi - 1]) && (cvpostoji[drugi - 1]))
		{
			b[prvi - 1][drugi - 1] = 0;
			b[drugi - 1][prvi - 1] = 0;
		}
		else
		{
			cout << "Greska! Neki od cvorova ne postoji u grafu!";
		}
	}

	void brisigraf()
	{
		for (int i = 0; i < 50; i++) cvpostoji[i] = false;
		ukupcv = 0;
		cout << "\nUpesno izbrisan graf!\n";
	}
};

int main()
{
	char izb;
	int a, b;
	graf g;
	cout << "Izaberi operaciju: \n1) Stvaranja grafa\n2) Dodavanje cvora\n3) Brisanje cvora \n4) Dodavanje grane \n5) Uklanjanje grane \n6) Ispis grafa \n7) Brisanje grafa iz memorije \n";
	cin >> izb;
	while (izb < '8')
	{
		switch (izb)
		{
		default:
			break;
		case '1':

			cout << "\nStvaranje grafa: Izaberi pocetni broj cvorova: ";
			cin >> a;
			g.inicgraf(a);
			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		case '2':
			g.dodajcvor();
			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		case '3':
			cout << "\nBrisanje cvora: Izaberi cvor: ";
			cin >> a;
			g.uklonicvor(a);
			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		case '4':
			cout << "\nDodavanje grane: Izaberi pocetni i krajnji cvor: ";
			cin >> a >> b;
			g.dodajgranu(a, b);
			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		case '5':
			cout << "\nUklanjanje grane: Izaberi pocetni i krajnji cvor: ";
			cin >> a >> b;
			g.brisigranu(a, b);
			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		case '6':
			g.ispisgrafa();
			//g.ispismatrice();
			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		case '7':
			g.brisigraf();
			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		}
	}


}