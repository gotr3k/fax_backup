#include <iostream>
#include <stdlib.h>
using namespace std;

class koordinate {
	int x, y;
public:
	koordinate(int x=0, int y=0)
	{
		this->x = x;
		this->y = y;
	}
	void setX(int x)
	{
		this->x = x;
	}
	void setY(int y)
	{
		this->y = y;
	}
	int getX()
	{
		return x;
	}
	int getY()
	{
		return y;
	}
};

class graf {
private:
	int b[50][50];
	int ukupcv;
	bool cvpostoji[50];
	int visina, sirina;
	koordinate kord[50];
	koordinate potcv[500];
	int brpotcv;
public:
	graf(int sir, int vis)
	{
		if (sir > 80 || vis > 50) { cout << "Greska! Prekoracene maksimalne dimenzije 80x50!\n"; return; }
		visina = vis;
		sirina = sir;
		ukupcv = 0;
		brpotcv = 0;
		for (int i = 0; i < 50; i++) { cvpostoji[i] = false; kord[i].setX(-1); kord[i].setY(-1); }
	}
	void inicgraf(int sir, int vis)
	{
		if (sir > 80 || vis > 50) { cout << "Greska! Prekoracene maksimalne dimenzije 80x50!\n"; return; }
		visina = vis;
		sirina = sir;
		ukupcv = 0;
		brpotcv = 0;
		for (int i = 0; i < 50; i++) { cvpostoji[i] = false; kord[i].setX(-1); kord[i].setY(-1); }

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
				cout << "| Koordinate: X="<<kord[i].getX()<<" Y="<< kord[i].getY()<<"\n";
			}
		}
	}

	bool postojicvornakord(int a, int b)
	{
		bool postoji = false;
		for (int i = 0; i < 50; i++)
		{
			if (kord[i].getX() == a && kord[i].getY() == b)
			{
				postoji = true;
				break;
			}
		}
		return postoji;
	}

	
	void ispislavirinta()
	{

		cout << "\n";
		for (int i = 0; i < visina; i++)
		{
				cout << "|";
				for (int j = 0; j < sirina; j++)
				{
					if (brojcvoranakord(j, i) == 0) { cout << "U "; continue; }
					if (brojcvoranakord(j, i) == 1) { cout << "I "; continue; }
					if (postojipotcvornakord(j, i))
					{
						cout << "  ";
					}
					else
						cout << "X ";
				}
				cout << "|\n";
		}

	}


	void dodajpocetak(int x, int y)
	{
		if (brpotcv==2)
		{
			cout << "Greska! Vec ste uneli pocetni i krajnji cvor!";
			return;
		}
		if (!(x == 0 || y == 0 || x == sirina-1 || y == visina-1))
		{
			cout << "\nGreska! Pocetak mora da bude uz ivicu lavirinta!\n";
			return;
		}

		potcv[brpotcv].setY(y);
		potcv[brpotcv++].setX(x);
	}

	bool postojipotcvornakord(int a, int b)
	{
		bool postoji = false;
		if (a > sirina || b > visina || a == -1 || b == -1) { return postoji; }
		for (int i = 0; i < brpotcv; i++)
		{
			if (potcv[i].getX() == a && potcv[i].getY() == b)
			{
				postoji = true;
				break;
			}
		}
		return postoji;
	}
	void dodajpotcv(int a, int b)
	{
		if (postojipotcvornakord(a, b)) { cout << "\nPostoji prolaz na tim koordinatama!\n"; return; }
		if (a + 1 > sirina || b + 1 > visina) { cout << "\nGreska! Van opsega!\n"; return; }
		potcv[brpotcv].setY(b);
		potcv[brpotcv++].setX(a);
	}

	int brojcvoranakord(int a, int b)
	{
		int ind = -1;
		for (int i = 0; i < 50; i++)
		{
			if (kord[i].getX() == a && kord[i].getY() == b)
			{
				ind = i;
				break;
			}
		}
		return ind;
	}

	void dodajcvor(int x, int y)
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
					kord[i].setX(x);
					kord[i].setY(y);
				}
				return;
			}
		}
		for (int i = 0; i <= ukupcv; i++)
		{
			b[ukupcv][i] = 0;
			b[i][ukupcv] = 0;
		}
		cvpostoji[ukupcv] = true;
		kord[ukupcv].setX(x);
		kord[ukupcv].setY(y);
		//cout << "\nNovi cvor dodat na novo mesto: " << ukupcv + 1 << " !";
		ukupcv++;
	}

	void potcvjecvor(int b) //ispitivanje da li je potencijalni cvor, odnosno jedan pomeraj u lavirintu raskrsnica, odnosno cvor grafa
	{
		bool gore = false;
		bool dole = false;
		bool levo = false;
		bool desno = false;
		if (postojipotcvornakord(potcv[b].getX() - 1, potcv[b].getY())) levo = true;
		if (postojipotcvornakord(potcv[b].getX() + 1, potcv[b].getY())) desno = true;
		if (postojipotcvornakord(potcv[b].getX(), potcv[b].getY() - 1)) gore = true;
		if (postojipotcvornakord(potcv[b].getX(), potcv[b].getY() + 1)) dole = true;
		if (!(((dole && gore) && (!levo && !desno)) || (levo && desno) && (!gore && !dole)))
		{
			dodajcvor(potcv[b].getX(), potcv[b].getY());
		}
	}

	void potcvucvor()
	{
		for (int i = 0; i < brpotcv; i++)
		{
			potcvjecvor(i);
		}
	}



	void dodajgranu(int prvi, int drugi)
	{
		if ((prvi < ukupcv) && (drugi < ukupcv) && (cvpostoji[prvi]) && (cvpostoji[drugi]))
		{
			b[prvi][drugi] = 1;
			b[drugi][prvi] = 1;
		}
		else
		{
			cout << "Greska! Neki od cvorova ne postoji u grafu!   "<<prvi<<"  "<<drugi;
		}
	}


	void spoji(int a, int b, int c, int d)
	{
		int poz1 = brojcvoranakord(a, b);
		int poz2 = brojcvoranakord(c, d);
		dodajgranu(poz1, poz2);
	}

	void brisigraf()
	{
		for (int i = 0; i < 50; i++) cvpostoji[i] = false;
		ukupcv = 0;
		cout << "\nUpesno izbrisan graf!\n";
	}

	void povezigraf()
	{
		for (int i = 0; i < ukupcv; i++)
		{
			int s = kord[i].getX();
			int v = kord[i].getY();
			//horizontala
			s++;
			while (s < sirina)
			{
				if (!postojipotcvornakord(s, v))
					break;
				if (postojicvornakord(s, v))
				{
					dodajgranu(brojcvoranakord(s, v), i);
					break;
				}
				s++;
			}

		}

		for (int i = 0; i < ukupcv; i++)
		{
			int s = kord[i].getX();
			int v = kord[i].getY();
			//vertikala
			v++;
			while (v < visina)
			{
				if (!postojipotcvornakord(s, v))
					break;
				if (postojicvornakord(s, v))
				{
					dodajgranu(brojcvoranakord(s, v), i);
					break;
				}
				v++;
			}

		}

	}
	
	void dijkstra()
	{
		int *najkr=new int[ukupcv];
		int* prethodnik = new int[ukupcv];
		bool *posecen=new bool[ukupcv];
		for (int i = 1; i < ukupcv; i++) { posecen[i] = false; }
		for (int i = 1; i < ukupcv; i++) { prethodnik[i] = b[0][i]; }
		for (int i = 1; i < ukupcv; i++) { if (b[0][i] == 1) najkr[i] = 1; else najkr[i] = 500; }
		int indmin = 1;
		while (1)
		{
			
			indmin = 1;
			for (int i = 1; i < ukupcv; i++)
			{
				if ((najkr[i] < najkr[indmin]) && !posecen[i]) { indmin = i; break;}
			}
			//cout << "\nIndmin je:" << indmin;
			posecen[indmin] = true;
			if (indmin == 1) break;
			for (int i = 1; i < ukupcv; i++)
			{
				if ((b[indmin][i] == 1)&& !posecen[i])
				{
					najkr[i] = najkr[indmin] + 1;
					prethodnik[i] = indmin+1;
				}
			}	
		}

		cout << "\nDIJKSTRA REZULTAT:";
		cout << "\nVektor najkracih rast: \n";
		for (int i = 1; i < ukupcv; i++) { cout << " " << najkr[i]; }
		cout << "\nVektor posecenih: \n";
		for (int i = 1; i < ukupcv; i++) { cout << " " << posecen[i]; }
		cout << "\nVektor prethodnih: \n";
		for (int i = 1; i < ukupcv; i++) { cout << " " << prethodnik[i]; }
		cout << "\n";

		int putanja[50];
		int brputanja = 0;
		int pozicija=1;
		bool imaputanja = true;

		while (pozicija != 0)
		{
			if (prethodnik[pozicija] == 0) { imaputanja = false; break; }
			putanja[brputanja++] = prethodnik[pozicija] - 1;
			pozicija = prethodnik[pozicija] - 1;
		}
		if (imaputanja)
		{
			cout << "\nPostoji putanja!\nPutanja kroz lavirint: ";
			for (int i = brputanja - 1; i >= 0; i--)
			{
				cout << "(" << kord[putanja[i]].getX() << ", " << kord[putanja[i]].getY() << ") -> ";
			}
			cout << "(" << kord[1].getX() << ", " << kord[1].getY() << ") \n\n\n";
		}
		else 
		{
			cout << "\nNe postoji putanja!\n";
		}

		delete[] najkr;
		delete[] posecen;
		delete[] prethodnik;
	}


};



int main()
{
	//primer 1
	/*graf g(6, 6);
	g.dodajpocetak(1, 5);
	g.dodajpocetak(5, 2);
	g.dodajpotcv(1, 4);
	g.dodajpotcv(2, 4);
	g.dodajpotcv(3, 4);
	g.dodajpotcv(4, 4);
	g.dodajpotcv(3, 3);
	g.dodajpotcv(3, 2);
	g.dodajpotcv(3, 1);
	g.dodajpotcv(4, 2);
	g.dodajpotcv(2, 1);
	g.dodajpotcv(1, 1);
	g.dodajpotcv(1, 2);*/

	//primer 2

	/*graf g(10, 10);
	g.dodajpocetak(0, 7);
	g.dodajpocetak(8, 9);
	g.dodajpotcv(1, 7);
	g.dodajpotcv(1, 6);
	g.dodajpotcv(1, 5);
	g.dodajpotcv(1, 4);
	g.dodajpotcv(1, 3);
	g.dodajpotcv(1, 2);
	g.dodajpotcv(2, 2);
	g.dodajpotcv(3, 2);
	g.dodajpotcv(4, 2);
	g.dodajpotcv(5, 2);
	g.dodajpotcv(6, 2);
	g.dodajpotcv(7, 2);
	g.dodajpotcv(8, 2);
	g.dodajpotcv(3, 1);
	g.dodajpotcv(7, 1);
	g.dodajpotcv(7, 0);
	g.dodajpotcv(8, 0);
	g.dodajpotcv(4, 3);
	g.dodajpotcv(4, 4);
	g.dodajpotcv(4, 5);
	g.dodajpotcv(4, 6);
	g.dodajpotcv(4, 7);
	g.dodajpotcv(4, 8);
	g.dodajpotcv(3, 8);
	g.dodajpotcv(5, 6);
	g.dodajpotcv(6, 6);
	g.dodajpotcv(6, 5);
	g.dodajpotcv(6, 4);
	g.dodajpotcv(6, 7);
	g.dodajpotcv(6, 8);
	g.dodajpotcv(6, 9);
	g.dodajpotcv(7, 9);
	g.dodajpotcv(7, 4);
	g.dodajpotcv(7, 7);
	g.dodajpotcv(8, 4);
	g.dodajpotcv(8, 5);
	g.dodajpotcv(8, 6);
	g.dodajpotcv(8, 7);

	
	g.potcvucvor();
	g.povezigraf();
	g.ispisgrafa();
	g.ispislavirinta();
	g.dijkstra();*/

	char izb;
	int a, b;
	graf g(80, 50);
	cout << "Izaberi operaciju: \n1) Novi lavirint: unos dimenzija\n2) Unos ulaza i izlaza iz lavirinta\n3) Dodavanje putanja\n4) Pronalazenje puta \n5) TEST PRIMER \n";
	cin >> izb;
	while (izb < '6')
	{
		switch (izb)
		{
		default:
			break;
		case '1':

			cout << "\nStvaranje lavirinta - unesi dimenzije: ";
			cin >> a>>b;
			g.inicgraf(a, b);
			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		case '2':
			cout << "\nStvaranje lavirinta - unesi dimenzije ulaza: ";
			cin >> a >> b;
			g.dodajpocetak(a, b);
			cout << "\nStvaranje lavirinta - unesi dimenzije izlaza: ";
			cin >> a >> b;
			g.dodajpocetak(a, b);
			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		case '3':
			cout << "\nDodavanje putanje - upisi dimenzije prolaza: ";
			cin >> a>>b;
			g.dodajpotcv(a, b);
			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		case '4':
			g.potcvucvor();
			g.povezigraf();
			g.ispisgrafa();
			g.ispislavirinta();
			g.dijkstra();
			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		case '5':
			
			g.inicgraf(10, 10);
			g.dodajpocetak(0, 7);
			g.dodajpocetak(8, 9);
			g.dodajpotcv(1, 7);
			g.dodajpotcv(1, 6);
			g.dodajpotcv(1, 5);
			g.dodajpotcv(1, 4);
			g.dodajpotcv(1, 3);
			g.dodajpotcv(1, 2);
			g.dodajpotcv(2, 2);
			g.dodajpotcv(3, 2);
			g.dodajpotcv(4, 2);
			g.dodajpotcv(5, 2);
			g.dodajpotcv(6, 2);
			g.dodajpotcv(7, 2);
			g.dodajpotcv(8, 2);
			g.dodajpotcv(3, 1);
			g.dodajpotcv(7, 1);
			g.dodajpotcv(7, 0);
			g.dodajpotcv(8, 0);
			g.dodajpotcv(4, 3);
			g.dodajpotcv(4, 4);
			g.dodajpotcv(4, 5);
			g.dodajpotcv(4, 6);
			g.dodajpotcv(4, 7);
			g.dodajpotcv(4, 8);
			g.dodajpotcv(3, 8);
			g.dodajpotcv(5, 6);
			g.dodajpotcv(6, 6);
			g.dodajpotcv(6, 5);
			g.dodajpotcv(6, 4);
			g.dodajpotcv(6, 7);
			g.dodajpotcv(6, 8);
			g.dodajpotcv(6, 9);
			g.dodajpotcv(7, 9);
			g.dodajpotcv(7, 4);
			g.dodajpotcv(7, 7);
			g.dodajpotcv(8, 4);
			g.dodajpotcv(8, 5);
			g.dodajpotcv(8, 6);
			g.dodajpotcv(8, 7);

			g.potcvucvor();
			g.povezigraf();
			g.ispisgrafa();
			g.ispislavirinta();
			g.dijkstra();

			cout << "\nIzaberi novu opciju:";
			cin >> izb;
			break;
		}
	}
}