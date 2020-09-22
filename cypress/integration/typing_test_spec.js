/// <reference types="cypress" />

const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

const SPACE_BAR = ' ';
const NBSP = String.fromCharCode(160);

describe('Site', () => {
  beforeEach(() => {
    cy.visit(siteUrl)
  })

  it('should display the Typo brand', () => {
    cy.contains('Typo').should('exist')
  })
})


describe('Typing Test : Input', () => {

  beforeEach(() => {
    cy.visit(siteUrl)
  })

  it('should start with empty input', () => {
    const input = cy.get('#test-container input')
    input.should($input => {
      expect($input.val()).to.equal('')
    })
  })

  it('should not reset input value without spacebar', () => {
    const input = cy.get('#test-container input')
    input.type('testinput', { delay: 50 });
    input.should('have.value', 'testinput');
  })

  it('should reset input value on spacebar', () => {
    const input = cy.get('#test-container input')
    input.type('testinput' + SPACE_BAR, { delay: 50 });
    input.should('have.value', '');
  })

  it('should change background color when mis-spelt', () => {
    const input = cy.get('#test-container input')
    input
      .then($input => {
        const normalColor = $input.css('background-color')
        input.type('somerubbish123', { delay: 20 })
        input.then($inputAfter => {
          const incorrectColor = $inputAfter.css('background-color')
          expect(normalColor).not.to.equal(incorrectColor);
        });
      });
  })

  it('should be disabled when no text left', () => {
    cy.wait(500)
    typeAllWords(false)
    .then(() => {
      cy
      .get('#test-container input')
      .should('be.disabled')
    })
  })
})


describe('Typing Test : Text', () => {

  beforeEach(() => {
    cy.visit(siteUrl)
  })

  it('should display test text', () => {
    cy.get('#test-text')
      .should($div => {
        expect($div.text()).to.have.length.of.at.least(10);
      });
  })

  it('should highlight first word', () => {
    cy
    .get('.w-current')
    .first()
    .then(($firstWord) => {
      cy
      .get('.w-remaining')
      .first()
      .then($secondWord => {
        expect($firstWord.css('color')).not.to.equal($secondWord.css('color'));
      })
    })
  })

  it('should move highlighted word on spacebar', () => {
    cy.wait(1000);
    cy
    .get('.w-current')
    .then($firstWord => {
      const firstWordText = $firstWord.text()

      const input = cy.get('#test-container input')
      input.type('supercalifragilisticexpialidocious' + SPACE_BAR)

      const completedText = cy.get('.w-completed').first()
      completedText.should('have.text', firstWordText)

      cy
      .get('.w-current')
      .then($secondWord => {
        expect(firstWordText).not.to.equal($secondWord.text())

        cy
        .get('.w-completed')
        .first()
        .should('not.have.css', 'color', $secondWord.css('color'))
      })
    })
  })

  it('should highlight completed words', function () {
    cy.wait(1000);
    cy
    .get('.w-current')
    .first()
    .then($firstWord => {
      const firstWordText = $firstWord.text().replaceAll(NBSP, '');

      const input = cy.get('#test-container input')
      input.type(firstWordText + SPACE_BAR)

      cy
      .get('.w-completed')
      .first()
      .then($completedWord => {
        expect($completedWord.text()).to.contain(firstWordText)

        // Check if completed text is highlighted with different color
        cy
        .get('.w-remaining')
        .first()
        .then($remainingWord => {
          expect($completedWord.css('color')).not.to.equal($remainingWord.css('color'))
        })
      });
    })
  })

  it('should highlight correct and incorrect words differently', function () {
    cy.wait(1000);
    cy
    .get('.w-current')
    .first()
    .then($firstWord => {
      const firstWordText = $firstWord.text().replaceAll(NBSP, SPACE_BAR).trim();

      const input = cy.get('#test-container input')
      input.type(firstWordText + SPACE_BAR )
      input.type('123456rubbish' + SPACE_BAR)

      cy
      .get('.w-completed')
      .eq(0)
      .then($correctWord => {
        cy
        .get('.w-completed')
        .eq(1)
        .then($incorrectWord => {
          expect($correctWord.css('color')).not.to.equal($incorrectWord.css('color'));
        })
      })
    })
  })
})

describe('Typing Test : Difficulty', () => {
  beforeEach(() => {
    cy.visit(siteUrl)
  })

  it('should display difficulty selector', () => {
    cy.get('#difficulty-select').should('exist')
  })

  it('should change words after selecting difficulty', () => {
    // Is there a way to avoid this promise hell? :(
    cy.get('#difficulty-select').select('Normal')
      .then(() => {
        cy.get('#test-text').then($p => {
          const normalLength = $p.text().length;
          cy.get('#difficulty-select').select('Hard')
            .then(() => {
              cy.get('#test-text').then($p => {
                const hardLength = $p.text().length;
                cy.get('#difficulty-select').select('God')
                  .then(() => {
                    cy.get('#test-text').then($p => {
                      const godLength = $p.text().length;

                      expect(normalLength).to.be.lessThan(hardLength);
                      expect(hardLength).to.be.lessThan(godLength);
                    })
                  })
              })
            })
        })
      })
  })
})

describe('Typing Test : Stats', () => {
  beforeEach(() => {
    cy.visit(siteUrl)
  })

  it('should display stats text', () => {
    const typingStats = cy.get('#typing-stats')
    typingStats.should('contain.text', 'WPM');
    typingStats.should('contain.text', 'ACC');
  })

  it('should reset when difficulty selection changes', function () {
    cy.wait(1000);

    typeAllWords()
    .then(() => {
      cy
      .get('#typing-stats')
      .invoke('text')
      .as('typingStatsText1')

      selectDifficulty('Hard')

      cy
      .get('#typing-stats')
      .invoke('text')
      .as('typingStatsText2')

      cy
      .get('@typingStatsText1')
      .then(text1 => {
        cy
        .get('@typingStatsText2')
        .then(text2 => {
          expect(text1).not.to.be.equals(text2)
          expect(text2).to.contain("WPM: 0")
          expect(text2).to.contain("ACC: 0.00%")
        })
      })
    })


  })

  it('should have 100% accuracy if all correct', () => {
    cy.wait(1000);
    typeAllWords()
    .then(() => {
      cy
      .get('#typing-stats')
      .should('contain.text', 'ACC: 100.00%')
    })
  })

  it('should show 0% accuracy if none correct', () => {
    cy.wait(500);
    typeAllWords(false)
      .then(() => {
        cy
        .contains('ACC:')
        .invoke('text')
        .as('accText')

        cy
        .get('@accText')
        .then(text => {
          const accValue = text.replace('ACC: ', '').replace('%', '');
          expect(Number.parseFloat(accValue)).to.be.equals(0);
        })
      })
  })

  it('should show words per minute', () => {
    cy.wait(500);
    typeAllWords(true)
      .then(() => {
        cy
        .contains('WPM:')
        .invoke('text')
        .as('wpmText')

        cy
        .get('@wpmText')
        .then(text => {
          const wpmValue = text.replace('WPM: ', '');
          expect(Number.parseFloat(wpmValue)).to.be.greaterThan(100);
        })
      })
  });
})

describe('Typing Test : Reset Button', () => {

  beforeEach(() => {
    cy.visit(siteUrl)
  })

  it('should show "RESET"', () => {
    cy
    .get('#reset-btn')
    .should('have.text', 'RESET')
  })

  it('should reset test text when clicked', () => {
    cy.wait(500)
    cy
    .get('#test-text')
    .invoke('text')
    .as('testText')

    cy
    .get('@testText')
    .then(testText1 => {
      cy.get('#reset-btn').click()
      cy
      .get('#test-text')
      .invoke('text')
      .then(testText2 => {
        expect(testText1).not.to.be.equals(testText2)
      })
    })
  })

  it('should reset stats when clicked', () => {
    cy.wait(500)
    typeAllWords(true)
    .then(() => {
      cy
      .get('#typing-stats')
      .invoke('text')
      .as('statsText')

      cy
      .get('@statsText')
      .then(statsText => {
        cy.get('#reset-btn').click()
        cy
        .get('#typing-stats')
        .invoke('text')
        .then(statsTextAfterReset => {
          expect(statsTextAfterReset).to.contain('WPM: 0')
          expect(statsTextAfterReset).to.contain('ACC: 0.00%')
          expect(statsText).not.to.be.equals(statsTextAfterReset)
        })
      })
    })
  })

  it('should change bg color and label to "AGAIN" after test finish', () => {
    cy.wait(500)
    cy
    .get('#reset-btn')
    .invoke('css', 'background-color')
    .as('btnOriginalColor')

    cy
    .get('@btnOriginalColor')
    .then(btnOriginalColor => {
      typeAllWords(false)
        .then(() => {
          const btn = cy.get('#reset-btn')
          btn.should('have.text', 'AGAIN')
          btn.should('not.have.css', 'background-color', btnOriginalColor)
        })
    })
  })
})


// --- HELPERS
function selectDifficulty(difficulty) {
  return cy.get('#difficulty-select').select(difficulty);
}

function typeAllWords(allCorrect = true) {
  const delay = 10;
  return new Promise(resolve => {
    cy
    .get('#test-text')
    .invoke('text')
    .then(testText => {
      const input = cy.get('#test-container input')
      testText = testText.replaceAll(NBSP, SPACE_BAR).trim()

      if (allCorrect) {
        input.type(testText + SPACE_BAR, { delay })
      } else {
        const numWords = testText.split(SPACE_BAR).length;
        input.type(('!' + SPACE_BAR).repeat(numWords) + SPACE_BAR, { delay })
      }
      resolve(true)
    })
  });
}

