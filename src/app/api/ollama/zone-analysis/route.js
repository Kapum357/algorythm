import { NextResponse } from 'next/server';
import { analyzeVulnerability, assessFloodRisk, generateEmergencyResponse } from '@/lib/ollama-service';

export async function POST(request) {
  try {
    const data = await request.json();
    const { zone, community, analysisType } = data;

    let result;

    switch (analysisType) {
      case 'vulnerability':
        result = await analyzeVulnerability({
          community: community || zone.name,
          riskLevel: zone.level,
          description: zone.description,
          vulnerabilities: community?.vulnerabilities
        });
        break;

      case 'flood-risk':
        result = await assessFloodRisk({
          location: zone.name,
          riskLevel: zone.level,
          description: zone.description,
          nearbyBodies: ['Río Bogotá', 'Quebrada Tibanica'],
          infrastructure: zone.infrastructure || 'Sistema de alcantarillado artesanal'
        });
        break;

      case 'emergency':
        result = await generateEmergencyResponse({
          incident: `Potencial inundación en ${zone.name}`,
          severity: zone.level,
          affected: community || { population: 'población estimada de la zona' },
          location: zone.name
        });
        break;

      default: {
        // Análisis completo por defecto
        const [vulnAnalysis, floodAnalysis, emergencyPlan] = await Promise.all([
          analyzeVulnerability({
            community: community?.name || zone.name,
            riskLevel: zone.level,
            description: zone.description,
            vulnerabilities: community?.vulnerabilities
          }),
          assessFloodRisk({
            location: zone.name,
            riskLevel: zone.level,
            description: zone.description
          }),
          generateEmergencyResponse({
            incident: `Potencial evento climático en ${zone.name}`,
            severity: zone.level,
            location: zone.name
          })
        ]);

        result = {
          vulnerability: vulnAnalysis,
          floodRisk: floodAnalysis,
          emergency: emergencyPlan
        };
        break;
      }
    }

    return NextResponse.json({ 
      success: true, 
      analysis: result,
      zone: zone.name,
      timestamp: new Date().toISOString() 
    });

  } catch (error) {
    console.error('Error en análisis de zona:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
